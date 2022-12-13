import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionsService } from '../services/projections.service';
import { ProjectionsController } from './projections.controller';

describe('ProjectionsController', () => {
  let controller: ProjectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectionsController],
      providers: [ProjectionsService],
    }).compile();

    controller = module.get<ProjectionsController>(ProjectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
