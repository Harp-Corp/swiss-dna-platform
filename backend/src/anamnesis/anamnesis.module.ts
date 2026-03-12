import { Module } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { AnamnesisController } from './anamnesis.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [PrismaModule, AuditModule],
  controllers: [AnamnesisController],
  providers: [AnamnesisService],
  exports: [AnamnesisService],
})
export class AnamnesisModule {}
