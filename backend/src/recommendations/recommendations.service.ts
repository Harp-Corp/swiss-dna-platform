import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class RecommendationsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  async findByUser(userId: string) {
    return this.prisma.recommendation.findMany({
      where: { userId },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findByUserId(requestingUserId: string, patientId: string) {
    const recommendations = await this.prisma.recommendation.findMany({
      where: { userId: patientId },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });

    await this.audit.log({
      userId: requestingUserId,
      action: 'DATA_ACCESS',
      resource: 'recommendations',
      metadata: { operation: 'doctor_read', patientId },
    });

    return recommendations;
  }

  async markAsRead(userId: string, recommendationId: string) {
    const recommendation = await this.prisma.recommendation.findFirst({
      where: { id: recommendationId, userId },
    });

    if (!recommendation) throw new NotFoundException('Recommendation not found');

    const updated = await this.prisma.recommendation.update({
      where: { id: recommendation.id },
      data: { isRead: true, readAt: new Date() },
    });

    await this.audit.log({
      userId,
      action: 'DATA_ACCESS',
      resource: 'recommendation',
      resourceId: recommendation.id,
      metadata: { operation: 'mark_read' },
    });

    return updated;
  }
}
