import { Controller, Patch, Get, Body, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IncrementViewDTO } from 'src/post/dto/increment-view.dto';
import { PostsService } from 'src/post/post.service';
import type { SessionViews } from 'src/post/types';

@Controller('post')
@ApiTags('Blog API')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Patch('/views')
  @ApiOperation({
    summary: '조회수 중가 API',
    description: '유저가 진입한 포스트 ID를 통해 조회수를 증가시킨다.',
  })
  async increment(
    @Body() { id: postId }: IncrementViewDTO,
    @Session() session: Record<string, any> & SessionViews,
  ) {
    if (!session.views) {
      session.views = {};
    }

    const thirtyMinutes = 30 * 60 * 1000;
    const lastViewTime = session.views[postId] || 0;

    if (Date.now() - lastViewTime > thirtyMinutes) {
      const views = await this.postsService.incrementViewCount(postId);
      session.views[postId] = Date.now();
      return { status: true, message: '', data: { views } };
    }

    return {
      status: false,
      data: { views: await this.postsService.getView(postId) },
      message: '⚠️ 30분 내의 이전 방문 기록이 존재합니다.',
    };
  }
}
