import { Controller, Patch, Get, Body } from '@nestjs/common';
import { PostsService } from 'src/post/post.service';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Patch('/views/increment')
  increment(@Body('id') id: string) {
    return this.postsService.increment(id);
  }
}
