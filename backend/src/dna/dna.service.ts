import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class DnaService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.dnaProfile.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!profile) throw new NotFoundException('DNA profile not found');

    await this.audit.log({
      userId,
      action: 'DATA_ACCESS',
      resource: 'dna_profile',
      resourceId: profile.id,
      metadata: { operation: 'read' },
    });

    return profile;
  }

  async getProfileByUserId(requestingUserId: string, patientId: string) {
    const profile = await this.prisma.dnaProfile.findFirst({
      where: { userId: patientId },
      orderBy: { createdAt: 'desc' },
    });

    if (!profile) throw new NotFoundException('DNA profile not found');

    await this.audit.log({
      userId: requestingUserId,
      action: 'DATA_ACCESS',
      resource: 'dna_profile',
      resourceId: profile.id,
      metadata: { operation: 'doctor_read', patientId },
    });

    return profile;
  }

  async getMarkers(userId: string) {
    const profile = await this.prisma.dnaProfile.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!profile) throw new NotFoundException('DNA profile not found');

    const markers = [
      { gene: 'FTO', variant: profile.ftoVariant, category: 'obesity', description: 'Obesity risk gene' },
      { gene: 'MTHFR', variant: profile.mthfrVariant, category: 'methylation', description: 'Methylation cycle' },
      { gene: 'ACTN3', variant: profile.actn3Variant, category: 'sport', description: 'Muscle fiber type' },
      { gene: 'APOE', variant: profile.apoeVariant, category: 'lipid', description: 'Lipid metabolism' },
      { gene: 'VDR', variant: profile.vdrVariant, category: 'vitamin_d', description: 'Vitamin D receptor' },
      { gene: 'COMT', variant: profile.comtVariant, category: 'dopamine', description: 'Dopamine metabolism' },
    ].filter((m) => m.variant != null);

    await this.audit.log({
      userId,
      action: 'DATA_ACCESS',
      resource: 'dna_markers',
      resourceId: profile.id,
      metadata: { operation: 'read_markers' },
    });

    return { profileId: profile.id, markers };
  }
}
