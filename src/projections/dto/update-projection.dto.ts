import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateProjectionDto {
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
