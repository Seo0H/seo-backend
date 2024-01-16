import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  //--- session & cookie ---
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  // --- swagger ---
  if (process.env.NODE_ENV === 'development') {
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
    origin: ['http://localhost:8080', 'https://seo0h.github.io'],
    optionsSuccessStatus: 200,
  });

  await app.listen(8080);
}
bootstrap();
