import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'max@beispiel.ch' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SicheresPasswort123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Max' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Mustermann' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: 'de' })
  @IsOptional()
  @IsString()
  language?: string;
}
