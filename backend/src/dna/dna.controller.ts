import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { DnaService } from './dna.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('dna')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dna')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user DNA profile' })
  async getMyProfile(@Req() req) {
    return this.dnaService.getProfile(req.user.sub);
  }

  @Get('profile/:userId')
  @Roles(Role.DOCTOR, Role.ADMIN)
  @ApiOperation({ summary: 'Get patient DNA profile (doctor/admin only)' })
  async getProfileByUserId(@Req() req, @Param('userId') userId: string) {
    return this.dnaService.getProfileByUserId(req.user.sub, userId);
  }

  @Get('markers')
  @ApiOperation({ summary: 'Get genetic markers with interpretations' })
  async getMyMarkers(@Req() req) {
    return this.dnaService.getMarkers(req.user.sub);
  }
}
