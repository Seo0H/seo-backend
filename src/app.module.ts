import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { OpenGraphModule } from 'src/open-graph/open-graph.module';
import { Post } from 'src/post/entities/post.entity';
import { PostsModule } from 'src/post/post.module';
import { ConfigModule } from '@nestjs/config';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: isDev ? ['.env.local', '.env.dev'] : '.env.local',
      isGlobal: true,
    }),
    OpenGraphModule,
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'postgres',
      entities: [Post],
      synchronize: true,
      logging: true,
      ssl: {
        ca: process.env.DB_SSL_PATH,
        rejectUnauthorized: false,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
