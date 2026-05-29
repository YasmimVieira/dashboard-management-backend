import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

type CreateUserDto = { email: string; password: string; name?: string };

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
    }

    async findOne(id: string) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async findByEmailWithPassword(email: string) {
        const user = await this.usersRepository.findByEmailWithPassword(email);
    }

    async saveRefreshToken(id: string, token: string) {
        await this.usersRepository.updateRefreshToken(id, token);
    }

}
