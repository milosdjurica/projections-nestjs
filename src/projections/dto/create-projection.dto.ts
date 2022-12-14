import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectionDto {
  @IsNotEmpty()
  @IsNumberString()
  id: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  team: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  opponent: string;

  @IsNotEmpty()
  @IsNumber()
  minutes: number;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsNotEmpty()
  @IsNumber()
  threes: number;

  @IsNotEmpty()
  @IsNumber()
  rebounds: number;

  @IsNotEmpty()
  @IsNumber()
  assists: number;

  @IsNotEmpty()
  @IsNumber()
  steals: number;

  @IsNotEmpty()
  @IsNumber()
  blocks: number;

  @IsNotEmpty()
  @IsNumber()
  turnovers: number;

  @IsNotEmpty()
  @IsNumber()
  twos: number;

  @IsNumber()
  @IsNotEmpty()
  freeThrows: number;

  @IsNotEmpty()
  @IsNumber()
  freeThrowsMissed: number;

  @IsNotEmpty()
  @IsNumber()
  fieldGoals: number;

  @IsNotEmpty()
  @IsNumber()
  fieldGoalsMissed: number;

  @IsNotEmpty()
  @IsNumber()
  doubleDoubles: number;

  @IsNotEmpty()
  @IsNumber()
  tripleDoubles: number;

  @IsString()
  injury: string;

  @IsOptional()
  @IsNumber()
  pointsScored?: number;

  @IsOptional()
  @IsNumber()
  granica?: number;
}
