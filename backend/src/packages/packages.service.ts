import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { PackageStatus } from '@prisma/client';

@Injectable()
export class PackagesService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  async listAvailable() {
    return this.prisma.patientPackage.findMany({
      where: { status: PackageStatus.ACTIVE },
      select: {
        type: true,
        price: true,
        currency: true,
      },
      distinct: ['type'],
    });
  }

  async getMyPackages(userId: string) {
    return this.prisma.patientPackage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { recommendations: true },
    });
  }

  async subscribe(userId: string, dto: CreatePackageDto) {
    const pkg = await this.prisma.patientPackage.create({
      data: {
        userId,
        type: dto.type,
        status: PackageStatus.PENDING_PAYMENT,
        paymentRef: dto.paymentRef,
      },
    });

    await this.audit.log({
      userId,
      action: 'DATA_ACCESS',
      resource: 'patient_package',
      resourceId: pkg.id,
      metadata: { operation: 'subscribe', type: dto.type },
    });

    return pkg;
  }

  async activate(userId: string, packageId: string) {
    const pkg = await this.prisma.patientPackage.findUnique({
      where: { id: packageId },
    });

    if (!pkg) throw new NotFoundException('Package not found');

    const updated = await this.prisma.patientPackage.update({
      where: { id: packageId },
      data: {
        status: PackageStatus.ACTIVE,
        activatedAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    await this.audit.log({
      userId,
      action: 'ADMIN_ACTION',
      resource: 'patient_package',
      resourceId: pkg.id,
      metadata: { operation: 'activate', patientId: pkg.userId },
    });

    return updated;
  }

  async cancel(userId: string, packageId: string) {
    const pkg = await this.prisma.patientPackage.findUnique({
      where: { id: packageId },
    });

    if (!pkg) throw new NotFoundException('Package not found');

    if (pkg.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const updated = await this.prisma.patientPackage.update({
      where: { id: packageId },
      data: { status: PackageStatus.CANCELLED },
    });

    await this.audit.log({
      userId,
      action: 'DATA_ACCESS',
      resource: 'patient_package',
      resourceId: pkg.id,
      metadata: { operation: 'cancel' },
    });

    return updated;
  }
}
