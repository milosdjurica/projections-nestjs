import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectionDto } from './create-projection.dto';

// export class UpdateProjectionDto extends PartialType(CreateProjectionDto) {}
export class UpdateProjectionDto {
  pointsScored?: number;
  granica?: number;
}
