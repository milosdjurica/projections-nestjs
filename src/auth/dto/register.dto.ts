import {
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(30)
  confirmPassword: string;

  @IsOptional()
  @IsBooleanString()
  isAdmin?: string;

  // make it so it has 2 passwords and check if they are same
  // also maybe include first name last name etc
}
