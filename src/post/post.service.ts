import { Injectable, NotFoundException } from '@nestjs/common';
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
    const found = await this.postRepository.findOne({
      select: ['id', 'view'],
      where: { id: postId },
    });

    if (found === null) {
      throw new NotFoundException(`${postId}를 찾지 못했습니다.`);
    }

    const increased = await this.postRepository.increment(
      { id: postId },
      'view',
      1,
    );

    return increased.affected != null;
  }
}
