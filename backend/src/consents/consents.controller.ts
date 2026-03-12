import { Controller, Get, Post, Delete, Param, Req, UseGuards, Ip } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ConsentsService } from './consents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsentType } from '@prisma/client';

@ApiTags('consents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('consents')
export class ConsentsController {
  constructor(private readonly consentsService: ConsentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all consents for current user' })
  async getMyConsents(@Req() req) {
    return this.consentsService.getUserConsents(req.user.id);
  }

  @Post(':type')
  @ApiOperation({ summary: 'Give consent (revDSG compliant)' })
  async giveConsent(
    @Req() req,
    @Param('type') type: ConsentType,
    @Ip() ip: string,
  ) {
    return this.consentsService.giveConsent(req.user.id, type, ip);
  }

  @Delete(':type')
  @ApiOperation({ summary: 'Revoke consent (GDPR Art. 7)' })
  async revokeConsent(@Req() req, @Param('type') type: ConsentType) {
    return this.consentsService.revokeConsent(req.user.id, type);
  }
}
