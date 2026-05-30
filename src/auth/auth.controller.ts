import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from 'src/models/auth.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autenticar usuário', description: 'Realiza login e retorna tokens JWT' })
  @ApiBody({ type: Auth })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: { id: 'uuid', name: 'João Silva', email: 'joao@example.com', isActive: true },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Email ou senha não informados' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() auth: Auth) {
    return this.authService.login(auth);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário', description: 'Cria uma conta e retorna tokens JWT' })
  @ApiBody({ type: Auth })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: { id: 'uuid', name: 'João Silva', email: 'joao@example.com', isActive: true },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  async register(@Body() auth: Auth) {
    return this.authService.register(auth);
  }
}