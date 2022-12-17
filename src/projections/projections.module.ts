import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectionsController } from './controllers/projections.controller';
import { ProjectionsService } from './services';
import { ProjectionsRepository } from './projections.repository';
import { Projection, ProjectionSchema } from '@Src/database/schemas';

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
