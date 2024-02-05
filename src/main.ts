import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const isDev = process.env.NODE_ENV === 'development';

  //--- ssl ---
  // NOTE: SSL은 개발 모드일때만 사용
  let httpsOptions = null;

  if (isDev) {
    logger.log('SSL IS RUNNING..');
    httpsOptions = {
      key: readFileSync(process.env.LOCALHOST_SSL_KEY_PATH),
      cert: readFileSync(process.env.LOCALHOST_SSL_CERT_PATH),
    };
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['verbose'],
    httpsOptions,
  });

  //--- session & cookie ---
  // Initialize client.
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.connect().catch((error) => new Logger(error));

  // Initialize store.
  const redisStore = new RedisStore({
    client: redisClient,
    ttl: 3600, // 1hour
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: redisStore,
      cookie: {
        sameSite: 'none',
        secure: true,
      },
    }),
  );

  // --- swagger ---
  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('seo-backend')
      .setDescription(
        '블로그 및 잡다한 커스텀 api가 필요할 때 사용하는 seo의 개인용 서버입니다',
      )
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }

  app.setViewEngine('ejs');
  app.enableCors({
    origin: [/localhost:3000$/, 'https://seo0h.github.io'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(8080);
}
bootstrap();
