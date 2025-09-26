import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',            // 🔥 ubah ke mysql
      host: '127.0.0.1',        // pakai IPv4 supaya aman di Windows
      port: 3306,               // default MySQL di XAMPP
      username: 'root',         // default user XAMPP
      password: '',             // default XAMPP kosong, isi kalau kamu bikin password
      database: 'community',    // database yang tadi kamu buat
      // entities: [User, Post],   // daftarkan entity User & Post
      autoLoadEntities: true,   // sudah pakai auto load 
      synchronize: true,        // auto-create tables saat dev
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}