import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@Src/database/entity.repository';
import {
  Projection,
  ProjectionDocument,
} from '@Src/projections/schemas/projection.schema';

@Injectable()
export class ProjectionsRepository extends EntityRepository<ProjectionDocument> {
  constructor(
    @InjectModel(Projection.name)
    private projectionModel: Model<ProjectionDocument>,
  ) {
    super(projectionModel);
  }
}
