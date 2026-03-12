import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';

@Injectable()
export class AnamnesisService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  async create(userId: string, dto: CreateAnamnesisDto) {
    const bmi =
      dto.heightCm && dto.weightKg
        ? Math.round((dto.weightKg / (dto.heightCm / 100) ** 2) * 10) / 10
        : undefined;

    const anamnesis = await this.prisma.anamnesis.create({
      data: {
        userId,
        ...dto,
        bmi,
        familyHistory: dto.familyHistory as any,
      },
    });

    await this.audit.log({
      userId,
      action: 'DATA_ACCESS',
      resource: 'anamnesis',
      resourceId: anamnesis.id,
      metadata: { operation: 'create' },
    });

    return anamnesis;
  }

  async findByUser(userId: string) {
    return this.prisma.anamnesis.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: string, dto: UpdateAnamnesisDto) {
    const existing = await this.prisma.anamnesis.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!existing) throw new NotFoundException('Anamnesis not found');

    const bmi =
      (dto.heightCm ?? existing.heightCm) && (dto.weightKg ?? existing.weightKg)
        ? Math.round(
            ((dto.weightKg ?? existing.weightKg) /
              (((dto.heightCm ?? existing.heightCm) / 100) ** 2)) *
              10,
          ) / 10
        : existing.bmi;

    const updated = await this.prisma.anamnesis.update({
      where: { id: existing.id },
      data: {
        ...dto,
        bmi,
        familyHistory: dto.familyHistory as any,
        version: existing.version + 1,
      },
    });

    await this.audit.log({
      userId,
      action: 'DATA_ACCESS',
      resource: 'anamnesis',
      resourceId: updated.id,
      metadata: { operation: 'update', version: updated.version },
    });

    return updated;
  }

  async findByUserId(userId: string) {
    const anamnesis = await this.prisma.anamnesis.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!anamnesis) throw new NotFoundException('Anamnesis not found');
    return anamnesis;
  }
}
