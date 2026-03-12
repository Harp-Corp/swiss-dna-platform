import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'max@beispiel.ch' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SicheresPasswort123!' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ description: 'TOTP code for MFA' })
  @IsOptional()
  @IsString()
  totpCode?: string;
}
