import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isDev } from 'src/lib/config/mode';

export default function typeOrmConfig() {
  const logger = new Logger(typeOrmConfig.name);

  if (isDev) {
    const config: TypeOrmModuleOptions = {
      url: process.env.DB_URL,
      type: 'postgres',
      logging: true,
      synchronize: true,
      entities: [__dirname + '/entities/**/*.dev.entity.ts'],
      ssl: {
        ca: process.env.DB_SSL_PATH,
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
    };

    logger.log('TypeOrm Dev mode is running.');

    return config;
  }

  const config: TypeOrmModuleOptions = {
    url: process.env.DB_URL,
    type: 'postgres',
    logging: true,
    synchronize: false,
    entities: [__dirname + '/entities/**/*.entity.ts'],
    ssl: {
      ca: process.env.DB_SSL_PATH,
      rejectUnauthorized: false,
    },
    autoLoadEntities: true,
  };

  logger.log('TypeOrm Prod mode is running.');

  return config;
}
