import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { OpenGraphModule } from 'src/open-graph/open-graph.module';
import { PostsModule } from 'src/post/post.module';

import { isDev } from 'src/lib/config/mode';
import typeOrmConfig from 'src/lib/config/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: isDev ? ['.env.local', '.env.dev'] : '.env.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    OpenGraphModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
