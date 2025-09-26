import { Controller, Post as HttpPost, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Controller('likes')
export class LikesController {
  constructor(
    private likesService: LikesService,
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpPost('post/:postId')
  async likePost(@Param('postId') postId: number, @Req() req) {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new NotFoundException('Post not found');

    const user = { id: req.user.userId } as User;
    return this.likesService.likePost(user, post);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpPost('comment/:commentId')
  async likeComment(@Param('commentId') commentId: number, @Req() req) {
    const comment = await this.commentRepo.findOneBy({ id: commentId });
    if (!comment) throw new NotFoundException('Comment not found');

    const user = { id: req.user.userId } as User;
    return this.likesService.likeComment(user, comment);
  }
}