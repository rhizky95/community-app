import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity('comment_likes')
@Unique(['user', 'comment'])
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  comment: Comment;
}