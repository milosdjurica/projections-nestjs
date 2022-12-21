import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  confirmPassword?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
