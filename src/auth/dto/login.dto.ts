import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
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

}
