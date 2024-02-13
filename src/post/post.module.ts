import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from 'src/post/post.service';
import { PostsController } from 'src/post/post.controller';
import { isDev } from 'src/lib/config/mode';

import DevPost from 'src/entities/post/index.dev.entity';
import Post from 'src/entities/post/index.entity';

@Module({
  imports: [TypeOrmModule.forFeature(isDev ? [DevPost] : [Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
