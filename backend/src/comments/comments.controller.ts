import { Controller, Post as HttpPost, Body, Param, Get, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpPost(':postId')
  async create(
    @Param('postId') postId: number,
    @Body() body: { content: string },
    @Req() req,
  ) {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) return { message: 'Post not found' };

    const user = { id: req.user.userId } as User;
    return this.commentsService.create(body.content, user, post);
  }

  @Get(':postId')
  async findByPost(@Param('postId') postId: number) {
    return this.commentsService.findByPost(postId);
  }
}