import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProjectionDto {
  @IsNotEmpty()
  @IsNumberString()
  idProjection: string;

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
  @Min(0)
  minutes: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  points: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  threes: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  rebounds: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  assists: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  steals: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  blocks: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  turnovers: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  twos: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  freeThrows: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  freeThrowsMissed: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fieldGoals: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fieldGoalsMissed: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  doubleDoubles: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  tripleDoubles: number;

  @IsString()
  injury: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsScored?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  granica?: number;
}
