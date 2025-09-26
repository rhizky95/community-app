import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Post } from '../posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post])],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [TypeOrmModule],
})
export class CommentsModule {}