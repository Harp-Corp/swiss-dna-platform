import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PackageType } from '@prisma/client';

export class CreatePackageDto {
  @ApiProperty({ enum: PackageType, example: 'BASIC' })
  @IsEnum(PackageType)
  type: PackageType;

  @ApiPropertyOptional({ example: 'ref-pay-12345' })
  @IsOptional()
  @IsString()
  paymentRef?: string;
}
