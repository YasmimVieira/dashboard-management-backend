import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entity.user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
