import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import * as OTPAuth from 'otpauth';
import * as QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuditAction, Role } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_DURATION_MINUTES = 30;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private auditService: AuditService,
    private eventEmitter: EventEmitter2,
  ) {}

  async register(dto: RegisterDto, ipAddress?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existing) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(dto.password, this.SALT_ROUNDS);
    const emailVerifyToken = uuidv4();
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(), passwordHash, emailVerifyToken, role: Role.PATIENT,
        profile: { create: { firstName: dto.firstName, lastName: dto.lastName, language: dto.language || 'de' } },
        consents: { create: [{ type: 'DATA_PROCESSING', given: true, givenAt: new Date(), ipAddress, version: '1.0' }] },
      },
      include: { profile: true },
    });
    await this.auditService.log({ userId: user.id, action: AuditAction.REGISTER, ipAddress });
    this.eventEmitter.emit('user.registered', { user, emailVerifyToken });
    return { message: 'Registration successful. Please verify your email.', userId: user.id };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findUnique({ where: { emailVerifyToken: token } });
    if (!user) throw new BadRequestException('Invalid or expired verification token');
    await this.prisma.user.update({ where: { id: user.id }, data: { isEmailVerified: true, emailVerifyToken: null } });
    return { message: 'Email verified successfully' };
  }

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() }, include: { profile: true } });
    if (!user || user.deletedAt) throw new UnauthorizedException('Invalid credentials');
    if (!user.isActive) throw new ForbiddenException('Account is deactivated');
    if (user.lockedUntil && user.lockedUntil > new Date()) throw new ForbiddenException('Account locked');
    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      const attempts = user.loginAttempts + 1;
      const lockedUntil = attempts >= this.MAX_LOGIN_ATTEMPTS ? new Date(Date.now() + this.LOCK_DURATION_MINUTES * 60000) : null;
      await this.prisma.user.update({ where: { id: user.id }, data: { loginAttempts: attempts, lockedUntil } });
      await this.auditService.log({ userId: user.id, action: AuditAction.LOGIN_FAILED, ipAddress });
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.prisma.user.update({ where: { id: user.id }, data: { loginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() } });
    if (user.mfaEnabled) {
      if (!dto.totpCode) return { requiresMfa: true, userId: user.id };
      if (!this.verifyTotp(user.mfaSecret!, dto.totpCode)) throw new UnauthorizedException('Invalid MFA code');
    }
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.prisma.session.create({ data: { userId: user.id, refreshToken: refreshTokenHash, ipAddress, userAgent, expiresAt: new Date(Date.now() + 7 * 24 * 3600000) } });
    await this.auditService.log({ userId: user.id, action: AuditAction.LOGIN, ipAddress, userAgent });
    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, user: { id: user.id, email: user.email, role: user.role, firstName: user.profile?.firstName, lastName: user.profile?.lastName } };
  }

  async logout(userId: string, refreshToken: string, ipAddress?: string) {
    const sessions = await this.prisma.session.findMany({ where: { userId } });
    for (const s of sessions) { if (await bcrypt.compare(refreshToken, s.refreshToken)) { await this.prisma.session.delete({ where: { id: s.id } }); break; } }
    await this.auditService.log({ userId, action: AuditAction.LOGOUT, ipAddress });
    return { message: 'Logged out successfully' };
  }

  async setupMfa(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    const totp = new OTPAuth.TOTP({ issuer: 'Swiss DNA Platform', label: user.email, algorithm: 'SHA1', digits: 6, period: 30, secret: OTPAuth.Secret.fromRandom(20) });
    const secret = totp.secret.base32;
    const qrCode = await QRCode.toDataURL(totp.toString());
    await this.prisma.user.update({ where: { id: userId }, data: { mfaSecret: secret } });
    return { secret, qrCode };
  }

  async confirmMfa(userId: string, totpCode: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.mfaSecret) throw new BadRequestException('MFA not initialized');
    if (!this.verifyTotp(user.mfaSecret, totpCode)) throw new BadRequestException('Invalid TOTP code');
    await this.prisma.user.update({ where: { id: userId }, data: { mfaEnabled: true } });
    return { message: 'MFA enabled successfully' };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_SECRET'), expiresIn: this.configService.get('JWT_EXPIRATION', '15m') }),
      this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d') }),
    ]);
    return { accessToken, refreshToken };
  }

  private verifyTotp(secret: string, code: string): boolean {
    try {
      const totp = new OTPAuth.TOTP({ algorithm: 'SHA1', digits: 6, period: 30, secret: OTPAuth.Secret.fromBase32(secret) });
      return totp.validate({ token: code, window: 1 }) !== null;
    } catch { return false; }
  }
}
