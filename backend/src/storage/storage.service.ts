import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as crypto from 'crypto';

export interface UploadResult {
  storageKey: string;
  checksumSha256: string;
  sizeBytes: number;
  mimeType: string;
}

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private minioClient: Minio.Client | null = null;
  private readonly bucketName: string;
  private available = false;

  constructor(private configService: ConfigService) {
    try {
      this.minioClient = new Minio.Client({
        endPoint: configService.get<string>('MINIO_ENDPOINT', 'localhost'),
        port: parseInt(configService.get<string>('MINIO_PORT', '9000'), 10),
        useSSL: configService.get<string>('NODE_ENV') === 'production',
        accessKey: configService.get<string>('MINIO_ACCESS_KEY', ''),
        secretKey: configService.get<string>('MINIO_SECRET_KEY', ''),
      });
    } catch (err) {
      this.logger.warn('MinIO client init failed, storage disabled', err);
    }
    this.bucketName = configService.get<string>('MINIO_BUCKET', 'sdp-documents');
  }

  async onModuleInit() {
    if (!this.minioClient) return;
    try {
      const exists = await this.minioClient.bucketExists(this.bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName, 'eu-central-1');
        this.logger.log(`Created MinIO bucket: ${this.bucketName}`);
      }
      this.available = true;
      this.logger.log('MinIO storage connected');
    } catch (error) {
      this.logger.warn('MinIO not available — file storage disabled (demo mode)');
    }
  }

  async uploadFile(fileBuffer: Buffer, originalName: string, mimeType: string, patientId: string, documentType: string): Promise<UploadResult> {
    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY', '').padEnd(32).substring(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    const encryptedBuffer = Buffer.concat([iv, cipher.update(fileBuffer), cipher.final()]);
    const checksumSha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const storageKey = `${patientId}/${documentType}/${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
    await this.minioClient.putObject(this.bucketName, storageKey, encryptedBuffer, encryptedBuffer.length, { 'Content-Type': 'application/octet-stream', 'X-Encrypted': 'aes-256-cbc', 'X-Checksum': checksumSha256 });
    return { storageKey, checksumSha256, sizeBytes: fileBuffer.length, mimeType };
  }

  async downloadFile(storageKey: string): Promise<Buffer> {
    const stream = await this.minioClient.getObject(this.bucketName, storageKey);
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const encryptedBuffer = Buffer.concat(chunks);
        const key = this.configService.get<string>('ENCRYPTION_KEY', '').padEnd(32).substring(0, 32);
        const iv = encryptedBuffer.subarray(0, 16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        resolve(Buffer.concat([decipher.update(encryptedBuffer.subarray(16)), decipher.final()]));
      });
      stream.on('error', reject);
    });
  }

  async getPresignedUrl(storageKey: string, expirySecs = 900): Promise<string> {
    return this.minioClient.presignedGetObject(this.bucketName, storageKey, expirySecs);
  }

  async deleteFile(storageKey: string): Promise<void> {
    await this.minioClient.removeObject(this.bucketName, storageKey);
  }

  async listPatientFiles(patientId: string): Promise<string[]> {
    const keys: string[] = [];
    const stream = this.minioClient.listObjects(this.bucketName, `${patientId}/`, true);
    return new Promise((resolve, reject) => {
      stream.on('data', (obj) => { if (obj.name) keys.push(obj.name); });
      stream.on('end', () => resolve(keys));
      stream.on('error', reject);
    });
  }

  async isHealthy(): Promise<boolean> {
    try { await this.minioClient.bucketExists(this.bucketName); return true; } catch { return false; }
  }
}
