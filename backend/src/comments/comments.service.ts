import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepo: Repository<Comment>,
  ) {}

  async create(content: string, user: User, post: Post) {
    const comment = this.commentsRepo.create({ content, user, post });
    return this.commentsRepo.save(comment);
  }

  async findByPost(postId: number) {
    const comments = await this.commentsRepo.find({
      where: { post: { id: postId } },
      relations: ['user', 'likes'],
    });

    return comments.map(c => ({
      ...c,
      likeCount: c.likes ? c.likes.length : 0,
    }));
  }
  
}