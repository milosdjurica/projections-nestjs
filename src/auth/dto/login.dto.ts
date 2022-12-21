import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
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

}
