import { Module } from '@nestjs/common';
import { ProjectionsService } from './projections.service';
import { ProjectionsController } from './projections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Projection, ProjectionSchema } from '@Src/schemas/projection.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Projection.name, schema: ProjectionSchema }])],
  controllers: [ProjectionsController],
  providers: [ProjectionsService],
})
export class ProjectionsModule {}
