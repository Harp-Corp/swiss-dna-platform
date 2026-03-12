import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  async log(action: string, userId: string, details?: Record<string, unknown>) {
    this.logger.log(`Audit: ${action} by ${userId}`);
    // TODO: persist to audit_logs table
  }
}
