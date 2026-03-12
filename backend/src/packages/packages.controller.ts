import { Controller, Get, Post, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PackagesService } from './packages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../decorators/public.decorator';
import { CreatePackageDto } from './dto/create-package.dto';

@ApiTags('packages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List available packages' })
  async listAvailable() {
    return this.packagesService.listAvailable();
  }

  @Get('my')
  @ApiOperation({ summary: 'Get current user packages' })
  async getMyPackages(@Req() req) {
    return this.packagesService.getMyPackages(req.user.sub);
  }

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to a package' })
  async subscribe(@Req() req, @Body() dto: CreatePackageDto) {
    return this.packagesService.subscribe(req.user.sub, dto);
  }

  @Patch(':id/activate')
  @Roles(Role.DOCTOR, Role.ADMIN)
  @ApiOperation({ summary: 'Activate a package (doctor/admin only)' })
  async activate(@Req() req, @Param('id') id: string) {
    return this.packagesService.activate(req.user.sub, id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a package' })
  async cancel(@Req() req, @Param('id') id: string) {
    return this.packagesService.cancel(req.user.sub, id);
  }
}
