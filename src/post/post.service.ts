import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
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
      await this.postRepository.increment({ id: postId }, 'view', 1);
      return await this.getView(postId);
    } catch (error) {
      throw new HttpException('DB Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getView(postId: string) {
    const selectedPost = await this.postRepository.findOne({
      select: ['id', 'view'],
      where: { id: postId },
    });

    return selectedPost.view;
  }
}
