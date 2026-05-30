import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfig } from './app.config';
import * as Joi from 'joi';

export interface ConfigType {
  app: AppConfig;
  database: TypeOrmModuleOptions;
}

export const appConfigSchema = Joi.object({
  APP_MESSAGE_PREFIX: Joi.string().default('Hello '),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  // DB_DATABASE: Joi.string().required(),
});