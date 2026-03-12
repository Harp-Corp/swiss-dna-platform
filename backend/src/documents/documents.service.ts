import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { StorageService } from '../storage/storage.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { DocumentType } from '@prisma/client';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
    private storage: StorageService,
  ) {}

  async upload(
    userId: string,
    file: Express.Multer.File,
    dto: UploadDocumentDto,
  ) {
    const patientId = dto.patientId || userId;

    const uploadResult = await this.storage.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      patientId,
      dto.type,
    );

    const document = await this.prisma.document.create({
      data: {
        patientId,
        uploadedById: userId,
        type: dto.type,
        originalName: file.originalname,
        storageKey: uploadResult.storageKey,
        mimeType: uploadResult.mimeType,
        sizeBytes: uploadResult.sizeBytes,
        checksumSha256: uploadResult.checksumSha256,
        notes: dto.notes,
      },
    });

    await this.audit.log({
      userId,
      action: 'DOCUMENT_UPLOAD',
      resource: 'document',
      resourceId: document.id,
      metadata: { type: dto.type, patientId, originalName: file.originalname },
    });

    return document;
  }

  async listByUser(userId: string) {
    return this.prisma.document.findMany({
      where: { patientId: userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(userId: string, documentId: string) {
    const document = await this.prisma.document.findFirst({
      where: { id: documentId, deletedAt: null },
    });

    if (!document) throw new NotFoundException('Document not found');

    if (document.patientId !== userId && document.uploadedById !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.audit.log({
      userId,
      action: 'DOCUMENT_ACCESS',
      resource: 'document',
      resourceId: document.id,
      metadata: { operation: 'read' },
    });

    return document;
  }

  async getDownloadUrl(userId: string, documentId: string) {
    const document = await this.findById(userId, documentId);

    const url = await this.storage.getPresignedUrl(document.storageKey);

    await this.audit.log({
      userId,
      action: 'DOCUMENT_ACCESS',
      resource: 'document',
      resourceId: document.id,
      metadata: { operation: 'download' },
    });

    return { url, originalName: document.originalName, mimeType: document.mimeType };
  }

  async softDelete(userId: string, documentId: string) {
    const document = await this.findById(userId, documentId);

    const updated = await this.prisma.document.update({
      where: { id: document.id },
      data: { deletedAt: new Date() },
    });

    await this.audit.log({
      userId,
      action: 'DATA_DELETE',
      resource: 'document',
      resourceId: document.id,
      metadata: { operation: 'soft_delete' },
    });

    return updated;
  }
}
