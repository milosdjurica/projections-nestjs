import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Projection, ProjectionDocument } from './schemas/projection.schema';

@Injectable()
export class ProjectionsRepository {
  constructor(
    @InjectModel(Projection.name)
    private projectionModel: Model<ProjectionDocument>,
  ) {}

  async find(
    projectionFilterQuery: FilterQuery<Projection>,
  ): Promise<Projection[]> {
    return this.projectionModel.find(projectionFilterQuery);
  }

  async findOne(
    projectionFilterQuery: FilterQuery<Projection>,
  ): Promise<Projection> {
    return this.projectionModel.findOne(projectionFilterQuery);
  }

  async create(projection: Projection): Promise<Projection> {
    const newProjection = new this.projectionModel(projection);
    return newProjection.save();
  }

  async findOneAndUpdate(
    projectionFilterQuery: FilterQuery<Projection>,
    projection: Partial<Projection>,
  ): Promise<Projection> {
    // by default returns old projection
    // if want to return new add {new:true} after projection
    return this.projectionModel.findOneAndUpdate(
      projectionFilterQuery,
      projection,
      { new: true },
    );
  }

  async delete(
    projectionFilterQuery: FilterQuery<Projection>,
  ): Promise<Projection> {
    return this.projectionModel.findOneAndDelete(projectionFilterQuery);
  }


  async deleteMany(projectionFilterQuery: FilterQuery<Projection>): Promise<boolean>{
    const deleteResult =  await this.projectionModel.deleteMany(projectionFilterQuery)
    return deleteResult.deletedCount>=1
  }
}
