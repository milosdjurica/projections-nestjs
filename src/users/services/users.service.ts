import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@Src/database/schemas';
import { FilterQuery } from 'mongoose';
import { UpdateUserDto } from '../dto';
import { UsersRepository } from '../users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(userFilterQuery: FilterQuery<User>) {
    return this.usersRepository.findOne(userFilterQuery);
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    userDto: UpdateUserDto,
  ): Promise<User> {
    // !fixed problem when changing username to already existing one
    if (userDto.username) {
      const usernameTaken = await this.usersRepository.findOne({
        username: userDto.username,
      });
      if (usernameTaken)
        throw new HttpException(
          'Username is already taken! Please provide another one.',
          HttpStatus.BAD_REQUEST,
        );
    }

    // if password was not changed just update
    if (!userDto.password) {
      return this.usersRepository.findOneAndUpdate(userFilterQuery, {
        ...userDto,
      });
    }

    delete userDto.confirmPassword;
    const hash = await bcrypt.hash(userDto.password, 10);
    return this.usersRepository.findOneAndUpdate(userFilterQuery, {
      hash,
      ...userDto,
    });
  }

  deleteUserByUsername(username: string) {
    return this.usersRepository.delete({ username });
  }
}
