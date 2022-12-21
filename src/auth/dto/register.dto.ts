import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(30)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(30)
  confirmPassword: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBooleanString()
  isAdmin?: string;

  // make it so it has 2 passwords and check if they are same
  // also maybe include first name last name etc
}
