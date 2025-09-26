import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const user = this.usersRepo.create({ email, password });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  // src/users/users.service.ts
  async createWithRole(email: string, password: string, role: 'user' | 'admin') {
    const user = this.usersRepo.create({ email, password, role });
    return this.usersRepo.save(user);
  }
}