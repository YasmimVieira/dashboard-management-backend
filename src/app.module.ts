import { Controller, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ItemsController } from './items/items.controller';
import { AuthController } from './auth/auth.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ItemsService } from './items/items.service';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, ItemsModule, UsersModule],
  controllers: [AppController, ItemsController, AuthController],
  providers: [AppService, AuthService, ItemsService, UsersService],
})
export class AppModule {}
