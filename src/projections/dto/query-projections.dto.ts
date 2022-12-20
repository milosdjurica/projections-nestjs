import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class QueryProjectionsDto {
  @IsOptional()
  @IsString()
  @MaxLength(15)
  lastName: string;
}
