import { IsString, IsEmail, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsEnum(['active', 'pending', 'inactive'])
  status1!: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}