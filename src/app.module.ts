import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database/database.module';
import { AuthModule } from './auth/auth/auth.module';
import { ItemsService } from './items/items/items.service';
import { ItemsController } from './items/items/items.controller';
import { Controller } from './items/.controller';
import { ItemsController } from './items/controller/items/items.controller';
import { ItemsService } from './items/service/items/items.service';
import { ServiceService } from './items/service/service.service';
import { ItemsService } from './items/service/items/items.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth/auth.service';
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, ItemsModule],
  controllers: [AppController, ItemsController, Controller],
  providers: [AppService, AuthService, ItemsService, ServiceService],
})
export class AppModule {}
