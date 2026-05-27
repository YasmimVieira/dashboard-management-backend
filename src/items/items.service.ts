import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Auth } from 'src/models/auth.model';

@Injectable()
export class ItemsService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(auth: Auth) {
        const user = await this.userService.findByEmail(auth.email);

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
        const hashedPassword = await bcrypt.hash(authRegister.password, 10);
        return this.userService.create({
            email: authRegister.email,
            password: hashedPassword,
            name: authRegister.name,
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

