import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLike } from './post-like.entity';
import { CommentLike } from './comment-like.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(PostLike) private postLikesRepo: Repository<PostLike>,
    @InjectRepository(CommentLike) private commentLikesRepo: Repository<CommentLike>,
  ) {}

  /** ✅ Toggle Like Post */
  async likePost(user: User, post: Post) {
    const existing = await this.postLikesRepo.findOne({
      where: { user: { id: user.id }, post: { id: post.id } },
    });

    if (existing) {
      await this.postLikesRepo.remove(existing);
      return { message: 'Post unliked' };
    }

    const like = this.postLikesRepo.create({ user, post });
    await this.postLikesRepo.save(like);
    return { message: 'Post liked' };
  }

  /** ✅ Toggle Like Comment */
  async likeComment(user: User, comment: Comment) {
    const existing = await this.commentLikesRepo.findOne({
      where: { user: { id: user.id }, comment: { id: comment.id } },
    });

    if (existing) {
      await this.commentLikesRepo.remove(existing);
      return { message: 'Comment unliked' };
    }

    const like = this.commentLikesRepo.create({ user, comment });
    await this.commentLikesRepo.save(like);
    return { message: 'Comment liked' };
  }
}