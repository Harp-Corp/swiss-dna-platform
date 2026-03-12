import { Controller, Get, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('recommendations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user recommendations' })
  async getMy(@Req() req) {
    return this.recommendationsService.findByUser(req.user.sub);
  }

  @Get(':userId')
  @Roles(Role.DOCTOR, Role.ADMIN)
  @ApiOperation({ summary: 'Get patient recommendations (doctor/admin only)' })
  async getByUserId(@Req() req, @Param('userId') userId: string) {
    return this.recommendationsService.findByUserId(req.user.sub, userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark recommendation as read' })
  async markAsRead(@Req() req, @Param('id') id: string) {
    return this.recommendationsService.markAsRead(req.user.sub, id);
  }
}
