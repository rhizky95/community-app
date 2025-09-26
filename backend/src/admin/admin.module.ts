import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { PostLike } from '../likes/post-like.entity';
import { CommentLike } from '../likes/comment-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment, PostLike, CommentLike])],
  controllers: [AdminController],
})
export class AdminModule {}