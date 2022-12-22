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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '@Src/common/guards';
import { ObjectIdPipe, PasswordValidationPipe } from '@Src/common/pipes';
import { UserOperations, UserResponses } from '@Src/common/swagger';
import { User } from '@Src/database/schemas';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from '../dto';
import { UsersService } from '../services';

@ApiBearerAuth('JWT')
@ApiTags('Admins')
@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation(UserOperations.get)
  @ApiResponse({ ...UserResponses.get, type: [User] })
  @Get()
  getAllUsers(): Promise<Partial<User>[]> {
    return this.userService.findAll();
  }

  @ApiOperation(UserOperations.getSingle)
  @ApiResponse(UserResponses.getSingle)
  @Get(':id')
  getUserById(
    @Param('id', ObjectIdPipe) userId: ObjectId,
  ): Promise<Partial<User>> {
    return this.userService.findOne({ _id: userId });
  }

  @ApiOperation(UserOperations.update)
  @ApiResponse(UserResponses.update)
  @Patch(':id')
  @UsePipes(new PasswordValidationPipe())
  updateUserByid(
    @Param('id', ObjectIdPipe) userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.userService.findOneAndUpdate({ _id: userId }, updateUserDto);
  }

  @ApiOperation(UserOperations.deleteSingle)
  @ApiResponse(UserResponses.delete)
  @Delete(':id')
  deleteUser(
    @Param('id', ObjectIdPipe) userId: ObjectId,
  ): Promise<Partial<User>> {
    return this.userService.deleteUserById({ _id: userId });
  }
}
