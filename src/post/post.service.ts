import { Injectable } from '@nestjs/common';
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

  async increment(id: string) {
    const found = await this.postRepository.findOne({
      select: ['id', 'view'],
      where: { id },
    });

    if (found === null) {
      //create id
    }

    const increased = await this.postRepository.increment({ id }, 'view', 1);
    return increased.affected != null;
  }
}
