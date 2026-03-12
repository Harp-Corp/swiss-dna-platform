import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditAction } from '@prisma/client';

export interface AuditLogInput {
  userId?: string;
  action: AuditAction | string;
  resource?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  async log(input: AuditLogInput) {
    this.logger.log(`Audit: ${input.action} by ${input.userId || 'system'}`);

    try {
      await this.prisma.auditLog.create({
        data: {
          userId: input.userId,
          action: input.action as AuditAction,
          resource: input.resource,
          resourceId: input.resourceId,
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
          metadata: input.metadata as any,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to persist audit log: ${error.message}`);
    }
  }
}
