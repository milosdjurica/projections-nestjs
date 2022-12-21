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
import { PasswordValidationPipe } from '@Src/common/pipes';
import { UserOperations } from '@Src/common/swagger';
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
  @Get(':username')
  getOneUser(@Param('username') username: string) {
    return this.userService.findOne({ username });
  }

  @ApiOperation(UserOperations.update)
  @Patch(':username')
  @UsePipes(new PasswordValidationPipe())
  updateUserByUsername(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.findOneAndUpdate({ username }, updateUserDto);
  }

  @ApiOperation(UserOperations.deleteSingle)
  @Delete(':username')
  deleteUser(@Param('username') username: string) {
    return this.userService.deleteUserByUsername(username);
  }
}
