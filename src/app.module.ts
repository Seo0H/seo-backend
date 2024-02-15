import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { OpenGraphModule } from 'src/open-graph/open-graph.module';
import { PostsModule } from 'src/post/post.module';

import { isDev } from 'src/lib/config/mode';
import typeOrmConfig from 'src/lib/config/db';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    ThrottlerModule.forRoot([{ ttl: 6000, limit: 10 }]),
    OpenGraphModule,
    PostsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
