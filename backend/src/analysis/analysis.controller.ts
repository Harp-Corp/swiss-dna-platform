import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('jobs')
  async createJob(
    @Request() req: { user: { sub: string } },
    @Body() body: { inputPath: string; metadata?: Record<string, unknown> },
  ) {
    return this.analysisService.createJob(req.user.sub, body.inputPath, body.metadata);
  }

  @Get('jobs')
  async listJobs(@Request() req: { user: { sub: string } }) {
    return this.analysisService.listJobsByUser(req.user.sub);
  }

  @Get('jobs/:id')
  async getJob(@Param('id') id: string) {
    return this.analysisService.getJob(id);
  }
}
