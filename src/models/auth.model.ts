import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Auth {
    @ApiProperty({ example: 'joao@example.com', description: 'E-mail do usuário' })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'Senha@123', description: 'Senha com no mínimo 6 caracteres', minLength: 6 })
    @IsString()
    @MinLength(6)
    password!: string;

    @ApiPropertyOptional({ example: 'João Silva', description: 'Nome completo do usuário' })
    @IsOptional()
    @IsString()
    name?: string;
}