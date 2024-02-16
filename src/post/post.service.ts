import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import DevPost from 'src/entities/post/index.dev.entity';
import Post from 'src/entities/post/index.entity';

import { isDev } from 'src/lib/config/mode';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(isDev ? DevPost : Post)
    private postRepository: Repository<Post | DevPost>,
  ) {}

  async findAll() {
    const foundPosts = await this.postRepository.find();
    return foundPosts;
  }

  async incrementViewCount(postId: string) {
    const found = await this.getView(postId);

    if (found === null) {
      throw new NotFoundException(`${postId}를 찾지 못했습니다.`);
    }
    try {
      await this.postRepository.increment({ id: postId }, 'views', 1);
      return await this.getView(postId);
    } catch (error) {
      throw new HttpException('DB Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getView(postId: string) {
    const selectedPost = await this.postRepository.findOne({
      select: ['id', 'views'],
      where: { id: postId },
    });

    return selectedPost.views;
  }
}
