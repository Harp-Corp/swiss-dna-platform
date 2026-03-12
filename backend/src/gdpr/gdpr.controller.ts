import { Controller, Get, Delete, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GdprService } from './gdpr.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('gdpr')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gdpr')
export class GdprController {
  constructor(private readonly gdprService: GdprService) {}

  @Get('export')
  @ApiOperation({ summary: 'Export all user data (revDSG Art. 25)' })
  async exportMyData(@Req() req) {
    return this.gdprService.exportUserData(req.user.id);
  }

  @Delete('delete-account')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete all user data (revDSG Art. 28)' })
  async deleteMyAccount(@Req() req) {
    return this.gdprService.deleteUserData(req.user.id);
  }
}
