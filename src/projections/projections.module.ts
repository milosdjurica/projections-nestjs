import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Projection, ProjectionSchema } from './schemas/projection.schema';
import { ProjectionsController } from './controllers/projections.controller';
import { ProjectionsRepository } from './projections.repository';
import { ProjectionsService } from './services/projections.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Projection.name, schema: ProjectionSchema },
    ]),
  ],
  controllers: [ProjectionsController],
  providers: [ProjectionsService, ProjectionsRepository],
})
export class ProjectionsModule {}
