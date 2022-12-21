import { Injectable } from '@nestjs/common';
import { Projection } from '@Src/database/schemas';
import {
  CreateProjectionDto,
  QueryProjectionsDto,
  UpdateProjectionDto,
} from '../dto';
import { ProjectionsRepository } from '../projections.repository';

@Injectable()
export class ProjectionsService {
  constructor(private readonly projectionsRepository: ProjectionsRepository) {}

  findAll() {
    return this.projectionsRepository.find({});
  }

  findByName(queryProjections: QueryProjectionsDto) {
    const { lastName, firstName } = queryProjections;

    // could change this to find all projections first
    // and filter them after by lastname and firstname 
    // but i think this is more efficient
    if (lastName && firstName)
      return this.projectionsRepository.find({ lastName, firstName });

    if (lastName) return this.projectionsRepository.find({ lastName });
    if (firstName) return this.projectionsRepository.find({ firstName });
    return this.projectionsRepository.find({});
  }

  findOne(projectionId: number) {
    return this.projectionsRepository.findOne({ projectionId });
  }

  async create(
    listOfProjections: CreateProjectionDto[],
  ): Promise<Projection[]> {
    // !this way may not create projections in same order like in file
    // !not sure if it is relevant right now, could change later
    // return Promise.all(
    //   listOfProjections.map((singleProjection) =>
    //     this.projectionsRepository.create(singleProjection),
    //   ),
    // );
    let arr = [];
    for (let singleProjection of listOfProjections) {
      arr.push(await this.projectionsRepository.create(singleProjection));
    }
    return arr;
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
