import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { ConsentType } from '@prisma/client';

@Injectable()
export class ConsentsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  async giveConsent(userId: string, type: ConsentType, ipAddress?: string) {
    const consent = await this.prisma.consent.upsert({
      where: { userId_type: { userId, type } },
      update: { given: true, givenAt: new Date(), revokedAt: null, ipAddress },
      create: { userId, type, given: true, givenAt: new Date(), ipAddress },
    });

    await this.audit.log({
      userId,
      action: 'CONSENT_GIVEN',
      resource: 'consent',
      resourceId: consent.id,
      metadata: { type },
    });

    return consent;
  }

  async revokeConsent(userId: string, type: ConsentType) {
    const consent = await this.prisma.consent.findUnique({
      where: { userId_type: { userId, type } },
    });

    if (!consent) throw new NotFoundException('Consent not found');

    const updated = await this.prisma.consent.update({
      where: { id: consent.id },
      data: { given: false, revokedAt: new Date() },
    });

    await this.audit.log({
      userId,
      action: 'CONSENT_REVOKED',
      resource: 'consent',
      resourceId: consent.id,
      metadata: { type },
    });

    return updated;
  }

  async getUserConsents(userId: string) {
    return this.prisma.consent.findMany({ where: { userId } });
  }

  async hasConsent(userId: string, type: ConsentType): Promise<boolean> {
    const consent = await this.prisma.consent.findUnique({
      where: { userId_type: { userId, type } },
    });
    return consent?.given ?? false;
  }
}
