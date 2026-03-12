import { Controller, Get, Post, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AnamnesisService } from './anamnesis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';

@ApiTags('anamnesis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('anamnesis')
export class AnamnesisController {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Post()
  @ApiOperation({ summary: 'Create anamnesis for current user' })
  async create(@Req() req, @Body() dto: CreateAnamnesisDto) {
    return this.anamnesisService.create(req.user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user anamnesis' })
  async getMy(@Req() req) {
    return this.anamnesisService.findByUser(req.user.sub);
  }

  @Patch()
  @ApiOperation({ summary: 'Update current user anamnesis' })
  async update(@Req() req, @Body() dto: UpdateAnamnesisDto) {
    return this.anamnesisService.update(req.user.sub, dto);
  }

  @Get(':userId')
  @Roles(Role.DOCTOR, Role.ADMIN)
  @ApiOperation({ summary: 'Get patient anamnesis (doctor/admin only)' })
  async getByUserId(@Param('userId') userId: string) {
    return this.anamnesisService.findByUserId(userId);
  }
}
