import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: Boolean(process.env.DATABASE_SYNC ?? false),
    ssl: {
      rejectUnauthorized: false,
    },
  }),
);