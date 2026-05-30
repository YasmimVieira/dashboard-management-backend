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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigSchema, ConfigType } from './config/config-types';
import { Items } from './items/items.entity';
import { User } from './users/entity.user';
import { appConfig } from './config/app.config';
import { typeOrmConfig } from './config/database.config';
import { TypedConfigService } from './config/typed.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get('database'),
        entities: [Items, User],
      }),
    }),
    ConfigModule.forRoot({
      load: [typeOrmConfig, appConfig],
      validationSchema: appConfigSchema,
      validationOptions: { abortEarly: true },
    }),
    AuthModule,
    ItemsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: TypedConfigService,
      useExisting: ConfigService,
    }

  ],
})
export class AppModule {}
