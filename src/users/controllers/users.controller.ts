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
import { PasswordValidationPipe } from '@Src/common/pipes';
import { UpdateUserDto } from '../dto';
import { UsersService } from '../services';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':username')
  getOneUser(@Param('username') username: string) {
    return this.userService.findOne({ username });
  }

  @Patch(':username')
  @UsePipes(new PasswordValidationPipe())
  updateUserByUsername(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.findOneAndUpdate({ username }, updateUserDto);
  }

  @Delete(':username')
  deleteUser(@Param('username') username: string) {
    return this.userService.deleteUserByUsername(username);
  }
}
