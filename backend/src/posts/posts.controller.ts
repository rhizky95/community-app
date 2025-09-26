import { Controller, Get, Post as HttpPost, Body, UseGuards, Req, Query, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAll(@Query('tag') tag?: string) {
    return this.postsService.findAll(tag);
  }

  @Get(':id')
async getOne(@Param('id') id: number) {
  return this.postsService.findOne(+id);
}

  @UseGuards(AuthGuard('jwt'))
  @HttpPost()
  async create(@Body() body: { title: string; content: string; tags: string[] }, @Req() req) {
    const user = { id: req.user.userId }; // user dari JWT
    return this.postsService.create(body.title, body.content, body.tags, user as any);
  }
}
