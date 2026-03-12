import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';

export interface AnalysisJob {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  inputPath: string;
  outputPath?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);
  private readonly jobs = new Map<string, AnalysisJob>();

  constructor(private readonly storageService: StorageService) {}

  async createJob(userId: string, inputPath: string, metadata?: Record<string, unknown>): Promise<AnalysisJob> {
    const job: AnalysisJob = {
      id: uuidv4(),
      userId,
      status: 'pending',
      inputPath,
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata,
    };
    this.jobs.set(job.id, job);
    this.logger.log(`Created analysis job ${job.id} for user ${userId}`);
    // Trigger async processing
    this.processJob(job.id).catch((err) =>
      this.logger.error(`Job ${job.id} failed: ${err.message}`),
    );
    return job;
  }

  async getJob(jobId: string): Promise<AnalysisJob | undefined> {
    return this.jobs.get(jobId);
  }

  async listJobsByUser(userId: string): Promise<AnalysisJob[]> {
    return Array.from(this.jobs.values()).filter((j) => j.userId === userId);
  }

  private async processJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;
    job.status = 'processing';
    job.updatedAt = new Date();
    try {
      // Read raw DNA data from storage
      const chunks: Buffer[] = [];
      const stream = await this.storageService.downloadFile(job.inputPath);
      await new Promise<void>((resolve, reject) => {
        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
        stream.on('end', resolve);
        stream.on('error', reject);
      });
      const rawData = Buffer.concat(chunks).toString('utf-8');
      // Basic analysis placeholder
      const result = { length: rawData.length, preview: rawData.slice(0, 100) };
      const outputPath = `results/${job.id}/result.json`;
      const resultBuffer = Buffer.from(JSON.stringify(result));
      await this.storageService.uploadFile(outputPath, resultBuffer, 'application/json');
      job.outputPath = outputPath;
      job.status = 'completed';
      job.updatedAt = new Date();
      this.logger.log(`Job ${jobId} completed`);
    } catch (err) {
      job.status = 'failed';
      job.updatedAt = new Date();
      throw err;
    }
  }
}
