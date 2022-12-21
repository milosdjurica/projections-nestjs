import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProjectionDto {
  // !Swagger doc doesnt recognise this as schema
  // !because createProjection takes file and then parse it to this
  // !if can change then add ApiProperty() to all

  @IsNotEmpty()
  @Min(1000)
  @Max(9999)
  @IsNumber()
  projectionId: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(3)
  @IsString()
  team: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5)
  @IsString()
  position: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5)
  @IsString()
  opponent: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  minutes: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  points: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  threes: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  rebounds: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  assists: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  steals: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  blocks: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  turnovers: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  twos: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  freeThrows: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  freeThrowsMissed: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  fieldGoals: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  fieldGoalsMissed: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  doubleDoubles: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  tripleDoubles: number;

  @IsString()
  injury: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  pointsScored?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  granica?: number;
}
