import { Injectable } from '@nestjs/common';
import { User } from '@Src/database/schemas';
import { FilterQuery } from 'mongoose';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: User): Promise<User> {
    return this.usersRepository.create(user);
  }

  async findOne(username: string) {
    return this.usersRepository.findOne({ username });
  }

  findAll() {
    return this.usersRepository.find({});
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate(userFilterQuery, user);
  }
}
