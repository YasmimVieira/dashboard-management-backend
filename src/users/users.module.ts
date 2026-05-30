import { Module } from '@nestjs/common';
import { User } from 'src/users/entity.user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
