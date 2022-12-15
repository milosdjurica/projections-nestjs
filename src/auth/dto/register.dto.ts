import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;

  // make it so it has 2 passwords and check if they are same
  // also maybe include first name last name etc
}
