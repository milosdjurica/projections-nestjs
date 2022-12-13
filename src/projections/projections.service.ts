import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Projection, ProjectionDocument } from '@Src/schemas/projection.schema';
import { Model } from 'mongoose';
import { CreateProjectionDto, UpdateProjectionDto } from './dto';

@Injectable()
export class ProjectionsService {

  constructor(@InjectModel(Projection.name) private projectionModel: Model<ProjectionDocument>) {}

  async create(createProjectionDto: CreateProjectionDto): Promise<Projection> {
    return new this.projectionModel(createProjectionDto).save()
  }

  findAll() {
    return `This action returns all projections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projection`;
  }

  update(id: number, updateProjectionDto: UpdateProjectionDto) {
    return `This action updates a #${id} projection`;
  }

  remove(id: number) {
    return `This action removes a #${id} projection`;
  }
}
