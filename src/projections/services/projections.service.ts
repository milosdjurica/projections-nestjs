import { Injectable } from '@nestjs/common';
import { Projection } from '@Src/database/schemas';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ProjectionsRepository } from '../projections.repository';

@Injectable()
export class ProjectionsService {
  constructor(private readonly projectionsRepository: ProjectionsRepository) {}

  findAll() {
    return this.projectionsRepository.find({});
  }

  findOne(projectionId: number) {
    return this.projectionsRepository.findOne({ projectionId });
  }

  create(listOfProjections: CreateProjectionDto[]): Promise<Projection[]> {
    return Promise.all(
      listOfProjections.map((singleProjection) =>
        this.projectionsRepository.create(singleProjection),
      ),
    );
    // let arr = []
    // for (let singleProjection of listOfProjections) {
    //   arr.push(await this.projectionsRepository.create(singleProjection));
    // }
    // return arr;
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
