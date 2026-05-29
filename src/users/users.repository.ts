import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity.user';
import { TypeORMRepository } from 'src/repository/repository';

@Injectable()
export class UsersRepository extends TypeORMRepository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }

  // Métodos específicos do domínio
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    // Precisa do password para autenticação
    return this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email.toLowerCase() })
      .addSelect('user.password')
      .getOne();
  }

  async findActiveUsers(): Promise<User[]> {
    return this.repository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.repository.update(id, {
      lastLogin: new Date(),
    });
  }

  async updateRefreshToken(id: string, token: string): Promise<void> {
    await this.repository.update(id, {
      refreshToken: token,
    });
  }

  async invalidateRefreshToken(id: string): Promise<void> {
    await this.repository.update(id, {
      refreshToken: null,
    });
  }
}