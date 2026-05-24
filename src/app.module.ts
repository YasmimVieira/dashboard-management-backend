import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database/database.module';
import { AuthModule } from './auth/auth/auth.module';
import { AuthService } from './auth/services/auth/auth.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
