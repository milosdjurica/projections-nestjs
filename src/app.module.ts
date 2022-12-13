import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectionsModule } from './projections/projections.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/projections'),
    ProjectionsModule,
  ],
})
export class AppModule {}
