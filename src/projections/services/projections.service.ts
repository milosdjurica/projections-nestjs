import { Injectable } from '@nestjs/common';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ProjectionsRepository } from '../projections.repository';
import { Projection } from '../schemas/projection.schema';

@Injectable()
export class ProjectionsService {
  constructor(private readonly projectionsRepository: ProjectionsRepository) {}

  findAll() {
    return this.projectionsRepository.find({});
  }

  findOne(projectionId: number) {
    return this.projectionsRepository.findOne({ projectionId });
  }

  async create(createProjectionDto: CreateProjectionDto): Promise<Projection> {
    return this.projectionsRepository.create(createProjectionDto);
  }

  update(projectionId: number, updateProjectionDto: UpdateProjectionDto) {
    return this.projectionsRepository.findOneAndUpdate(
      { projectionId },
      updateProjectionDto,
    );
  }

  deleteById(projectionId: number) {
    return this.projectionsRepository.delete({ projectionId });
  }

  deleteMany() {
    return this.projectionsRepository.deleteMany({});
  }
}
