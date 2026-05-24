import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

        return {
            access_token,
            refresh_token,
            user: { id: user.id, email: user.email }
        }
    }

    async register(email: string, password: string, name: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userService.create({
            email,
            password: hashedPassword,
            name
        });
    }
}
