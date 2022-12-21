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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@Src/common/guards';
import { ObjectIdPipe, PasswordValidationPipe } from '@Src/common/pipes';
import { UserOperations } from '@Src/common/swagger';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from '../dto';
import { UsersService } from '../services';

@ApiBearerAuth()
@ApiTags('Admins')
@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation(UserOperations.get)
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @ApiOperation(UserOperations.getSingle)
  @Get(':id')
  getUserById(@Param('id', ObjectIdPipe) userId: ObjectId) {
    return this.userService.findOne({ _id: userId });
  }

  @ApiOperation(UserOperations.update)
  @Patch(':id')
  @UsePipes(new PasswordValidationPipe())
  updateUserByid(
    @Param('id', ObjectIdPipe) userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.findOneAndUpdate({ _id: userId }, updateUserDto);
  }

  @ApiOperation(UserOperations.deleteSingle)
  @Delete(':id')
  deleteUser(@Param('id', ObjectIdPipe) userId: ObjectId) {
    return this.userService.deleteUserById({ _id: userId });
  }
}
