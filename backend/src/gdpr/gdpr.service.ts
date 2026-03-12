import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class GdprService {
  private readonly logger = new Logger(GdprService.name);

  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  // revDSG Art. 25 - Right of data portability
  async exportUserData(userId: string) {
    const [user, profile, consents, anamneses, dnaProfiles, documents, packages, recommendations] =
      await Promise.all([
        this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, role: true, createdAt: true } }),
        this.prisma.userProfile.findUnique({ where: { userId } }),
        this.prisma.consent.findMany({ where: { userId } }),
        this.prisma.anamnesis.findMany({ where: { userId } }),
        this.prisma.dnaProfile.findMany({ where: { userId } }),
        this.prisma.document.findMany({ where: { patientId: userId }, select: { id: true, type: true, originalName: true, createdAt: true } }),
        this.prisma.patientPackage.findMany({ where: { userId } }),
        this.prisma.recommendation.findMany({ where: { userId } }),
      ]);

    await this.audit.log({
      userId,
      action: 'DATA_EXPORT',
      resource: 'gdpr',
      metadata: { exportedAt: new Date().toISOString() },
    });

    return {
      exportDate: new Date().toISOString(),
      format: 'JSON',
      user, profile, consents, anamneses, dnaProfiles, documents, packages, recommendations,
    };
  }

  // revDSG Art. 28 - Right to erasure
  async deleteUserData(userId: string) {
    this.logger.warn(`GDPR deletion requested for user ${userId}`);

    await this.audit.log({
      userId,
      action: 'DATA_DELETE',
      resource: 'gdpr',
      metadata: { requestedAt: new Date().toISOString() },
    });

    // Soft delete - mark user as deleted, anonymize PII
    await this.prisma.$transaction([
      this.prisma.consent.deleteMany({ where: { userId } }),
      this.prisma.recommendation.deleteMany({ where: { userId } }),
      this.prisma.anamnesis.deleteMany({ where: { userId } }),
      this.prisma.dnaProfile.deleteMany({ where: { userId } }),
      this.prisma.session.deleteMany({ where: { userId } }),
      this.prisma.userProfile.deleteMany({ where: { userId } }),
      this.prisma.user.update({
        where: { id: userId },
        data: {
          email: `deleted_${userId}@anonymized.local`,
          passwordHash: 'DELETED',
          isActive: false,
          deletedAt: new Date(),
          mfaSecret: null,
          refreshTokenHash: null,
        },
      }),
    ]);

    return { success: true, message: 'User data has been deleted per revDSG Art. 28' };
  }
}
