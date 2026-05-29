import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entity.user';
import bcrypt from 'node_modules/bcryptjs/umd/types';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: User) {
        const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            role: 'user'
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
