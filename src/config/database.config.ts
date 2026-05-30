import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: process.env.DB_SYNC === 'true',
    ssl: {
      rejectUnauthorized: false,
    },
  }),
);