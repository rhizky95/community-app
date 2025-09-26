import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepo: Repository<Post>,
  ) {}

  async create(title: string, content: string, tags: string[], user: User) {
    const post = this.postsRepo.create({
      title,
      content,
      tags,
      user,
    });
    return this.postsRepo.save(post);
  }

  async findAll(tag?: string) {
    const query = this.postsRepo.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes');

    if (tag) {
      query.where('FIND_IN_SET(:tag, post.tags)', { tag });
    }

    const posts = await query.getMany();
    return posts.map(post => ({
      ...post,
      likeCount: post.likes?.length || 0
    }));
  }

  async findOne(id: number) {
    const post = await this.postsRepo.findOne({
      where: { id },
      relations: ['user', 'likes']
    });
    if (!post) return null;

    return {
      ...post,
      likeCount: post.likes ? post.likes.length : 0,
    };
  }
}