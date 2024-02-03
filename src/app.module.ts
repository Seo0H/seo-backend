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
import Config from 'src/lib/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    OpenGraphModule,
    TypeOrmModule.forRoot({
      url: new Config(process.env).get('dbUrl'),
      type: 'postgres',
      entities: [Post],
      synchronize: true,
      logging: true,
      ssl: {
        ca: new Config(process.env).get('dbSSLPath'),
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
