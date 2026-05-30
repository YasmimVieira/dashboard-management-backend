import { IsString, IsEmail, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'Tarefa importante', description: 'Nome do item' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'contato@empresa.com', description: 'E-mail de contato do item' })
  @IsEmail()
  email!: string;

  @ApiProperty({ enum: ['active', 'pending', 'inactive'], example: 'pending', description: 'Status do item' })
  @IsEnum(['active', 'pending', 'inactive'])
  status!: string;

  @ApiPropertyOptional({ enum: ['low', 'medium', 'high'], example: 'medium', description: 'Prioridade do item' })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: string;

  @ApiPropertyOptional({ example: 'Descrição detalhada da tarefa', description: 'Descrição do item' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2026-12-31', description: 'Data de vencimento (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}