import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { CommentLike } from '../likes/comment-like.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.id, { eager: true })
  user: User;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @OneToMany(() => CommentLike, like => like.comment, { cascade: true })
  likes: CommentLike[];
}