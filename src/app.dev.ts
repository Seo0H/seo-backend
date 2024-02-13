import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import { readFileSync } from 'fs';
import { AppModule } from 'src/app.module';

export default async function devBootstrap() {
  const logger = new Logger(devBootstrap.name);

  //--- ssl ---
  logger.log('SSL IS RUNNING..');

  const httpsOptions = {
    key: readFileSync(process.env.LOCALHOST_SSL_KEY_PATH),
    cert: readFileSync(process.env.LOCALHOST_SSL_CERT_PATH),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['verbose'],
    httpsOptions,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        sameSite: 'strict',
        domain: 'localhost',
        secure: true,
        httpOnly: true,
      },
    }),
  );

  // --- swagger ---
  const config = new DocumentBuilder()
    .setTitle('seo-backend')
    .setDescription(
      '블로그 및 잡다한 커스텀 api가 필요할 때 사용하는 seo의 개인용 서버입니다',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.setViewEngine('ejs');

  app.enableCors({
    origin: [/localhost:3000$/],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  return app;
}
