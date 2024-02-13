import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isDev } from 'src/lib/config/mode';

export default function typeOrmConfig(): TypeOrmModuleOptions {
  const logger = new Logger(typeOrmConfig.name);

  let config: TypeOrmModuleOptions = {
    url: process.env.DB_URL,
    type: 'postgres',
    logging: true,
    synchronize: true,
    ssl: {
      ca: process.env.DB_SSL_PATH,
      rejectUnauthorized: false,
    },
    autoLoadEntities: true,
  };

  if (isDev) {
    config = {
      ...config,
      entities: [__dirname + '/entities/**/*.dev.entity.ts'],
    };

    logger.log('TypeOrm Dev mode is running.');

    return config;
  }

  config = {
    ...config,
    entities: [__dirname + '/entities/**/*.entity.ts'],
  };

  logger.log('TypeOrm Prod mode is running.');

  return config;
}
