import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { Logger } from '@nestjs/common';
import { isDev } from 'src/lib/config/mode';

export default async function prodBootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //--- session & cookie ---
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.connect().catch((error) => new Logger(error));

  // Initialize store.
  const redisStore = new RedisStore({
    client: redisClient,
    ttl: 3600, // 1hour
  });

  app.set('trust proxy', 1);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      store: isDev ? undefined : redisStore,
      cookie: {
        sameSite: 'strict',
        domain: '.seo0h.me',
        secure: true,
        httpOnly: true,
      },
    }),
  );

  app.setViewEngine('ejs');

  app.enableCors({
    origin: ['https://blog.seo0h.me'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  return app;
}
