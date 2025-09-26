import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { PostLike } from '../likes/post-like.entity';


@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @OneToMany(() => Comment, comment => comment.post, { cascade: true })
  comments: Comment[];

  @OneToMany(() => PostLike, like => like.post, { cascade: true })
  likes: PostLike[];
}