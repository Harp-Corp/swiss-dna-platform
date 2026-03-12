import { IsOptional, IsNumber, IsString, IsArray, IsInt, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnamnesisDto {
  @ApiPropertyOptional({ example: 175 })
  @IsOptional()
  @IsNumber()
  heightCm?: number;

  @ApiPropertyOptional({ example: 72 })
  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @ApiPropertyOptional({ example: 'A+' })
  @IsOptional()
  @IsString()
  bloodType?: string;

  @ApiPropertyOptional({ example: 'never' })
  @IsOptional()
  @IsString()
  smokingStatus?: string;

  @ApiPropertyOptional({ example: 'moderate' })
  @IsOptional()
  @IsString()
  alcoholConsumption?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  activityLevel?: string;

  @ApiPropertyOptional({ example: 7.5 })
  @IsOptional()
  @IsNumber()
  sleepHoursAvg?: number;

  @ApiPropertyOptional({ example: 'omnivore' })
  @IsOptional()
  @IsString()
  dietType?: string;

  @ApiPropertyOptional({ example: ['lactose', 'gluten'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  foodIntolerances?: string[];

  @ApiPropertyOptional({ example: ['Vitamin D', 'Omega-3'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  supplements?: string[];

  @ApiPropertyOptional({ example: ['Asthma'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  chronicDiseases?: string[];

  @ApiPropertyOptional({ example: ['Ibuprofen'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medications?: string[];

  @ApiPropertyOptional({ example: ['Pollen'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergies?: string[];

  @ApiPropertyOptional({ example: { father: ['diabetes'], mother: ['hypertension'] } })
  @IsOptional()
  familyHistory?: Record<string, unknown>;

  @ApiPropertyOptional({ example: 5, description: 'Stress level 1-10' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  stressLevel?: number;

  @ApiPropertyOptional({ example: 'Occasional anxiety' })
  @IsOptional()
  @IsString()
  mentalHealthNotes?: string;

  @ApiPropertyOptional({ example: ['weight loss', 'better sleep'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  healthGoals?: string[];
}
