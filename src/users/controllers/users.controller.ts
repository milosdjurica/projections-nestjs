import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AdminGuard } from '@Src/common/guards';
import { ObjectIdPipe, PasswordValidationPipe } from '@Src/common/pipes';
import { User } from '@Src/database/schemas';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from '../dto';
import { UsersService } from '../services';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<Partial<User>[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(
    @Param('id', ObjectIdPipe) userId: ObjectId,
  ): Promise<Partial<User>> {
    return this.userService.findOne({ _id: userId });
  }

  @Patch(':id')
  @UsePipes(new PasswordValidationPipe())
  updateUserByid(
    @Param('id', ObjectIdPipe) userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.userService.findOneAndUpdate({ _id: userId }, updateUserDto);
  }

  @Delete(':id')
  deleteUser(
    @Param('id', ObjectIdPipe) userId: ObjectId,
  ): Promise<Partial<User>> {
    return this.userService.deleteUserById({ _id: userId });
  }
}
