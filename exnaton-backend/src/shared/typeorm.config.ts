import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_CONFIG } from './app.config';

const moduleConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  logging:
    APP_CONFIG.env === 'development'
      ? ['query', 'error', 'warn', 'log']
      : false,
  synchronize: true,
};

export const TYPEORM_CONFIG = {
  moduleConfig,
};
