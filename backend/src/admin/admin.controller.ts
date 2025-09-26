import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { PostLike } from '../likes/post-like.entity';
import { CommentLike } from '../likes/comment-like.entity';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminController {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Post) private postsRepo: Repository<Post>,
    @InjectRepository(Comment) private commentsRepo: Repository<Comment>,
    @InjectRepository(PostLike) private postLikesRepo: Repository<PostLike>,
    @InjectRepository(CommentLike) private commentLikesRepo: Repository<CommentLike>,
  ) {}

  @Get('analytics')
  async getAnalytics() {
    const usersCount = await this.usersRepo.count();
    const postsCount = await this.postsRepo.count();
    const commentsCount = await this.commentsRepo.count();
    const postLikesCount = await this.postLikesRepo.count();
    const commentLikesCount = await this.commentLikesRepo.count();

    return {
      users: usersCount,
      posts: postsCount,
      comments: commentsCount,
      postLikes: postLikesCount,
      commentLikes: commentLikesCount,
    };
  }
}