import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity('post_likes')
@Unique(['user', 'post']) // biar 1 user hanya bisa like 1x per post
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;
}