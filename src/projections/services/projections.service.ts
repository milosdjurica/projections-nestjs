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

  async create(
    listOfProjections: CreateProjectionDto[],
  ): Promise<Projection[]> {
    let arr = [];
    for (let singleProjection of listOfProjections) {
      arr.push(await this.projectionsRepository.create(singleProjection));
    }
    return arr;
  }

  update(projectionId: number, updateProjectionDto: UpdateProjectionDto) {
    return this.projectionsRepository.findOneAndUpdate(
      // projectionId: projectionId
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
