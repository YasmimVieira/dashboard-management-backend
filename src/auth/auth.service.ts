import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Auth } from 'src/models/auth.model';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async login(auth: Auth) {
        if (!auth.email || !auth.password) {
            throw new BadRequestException('Email and password are required');
        }

        const user = await this.userRepository.findByEmail(auth.email);

        if (!user || !await bcrypt.compare(auth.password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id };
        const acess_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

        return { 
            acess_token,
            refresh_token,
            user: {
                id: user.id,
                email: user.email,
                isActive: user.isActive,
            }
        };
    }

    async register(authRegister: Auth) {
        if (!authRegister.email || !authRegister.password) {
            throw new BadRequestException('Email and password are required');
        }

        const hashedPassword = await bcrypt.hash(authRegister.password, 10);
        return this.userService.create({
            email: authRegister.email,
            password: hashedPassword,
            name: authRegister.name ?? '',
        });
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
