import { Logger } from '@nestjs/common';
import prodBootstrap from 'src/app.prod';
import devBootstrap from 'src/app.dev';
import { isDev } from 'src/lib/config/mode';

async function bootstrap() {
  const app = isDev ? await devBootstrap() : await prodBootstrap();
  const port = 8080;
  const listeningHost = isDev ? 'localhost' : '0.0.0.0';

  await app.listen(port);

  const logger = new Logger('App');

  logger.log(`SEO Custom Server is running [${process.env.NODE_ENV}] mode`);
  logger.log(`Listening to https://${listeningHost}:${port}`);
}

bootstrap();
