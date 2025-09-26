import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PostLike } from './post-like.entity';
import { CommentLike } from './comment-like.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostLike, CommentLike, Post, Comment])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}