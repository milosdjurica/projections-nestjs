import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  confirmPassword?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
