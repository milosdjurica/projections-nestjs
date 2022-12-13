import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ProjectionsService } from '../services/projections.service';

@Controller('projections')
export class ProjectionsController {
  constructor(private readonly projectionsService: ProjectionsService) {}

  @Get()
  findAll() {
    return this.projectionsService.findAll();
  }

  @Get(':projectionId')
  findOne(@Param('projectionId', ParseIntPipe) projectionId: number) {
    return this.projectionsService.findOne(projectionId);
  }

  @Post()
  create(@Body() createProjectionDto: CreateProjectionDto) {
    return this.projectionsService.create(createProjectionDto);
  }

  @Patch(':projectionId')
  update(
    @Param('projectionId', ParseIntPipe) projectionId: number,
    @Body() updateProjectionDto: UpdateProjectionDto,
  ) {
    return this.projectionsService.update(projectionId, updateProjectionDto);
  }

  @Delete(':projectionId')
  remove(@Param('projectionId', ParseIntPipe) projectionId: number) {
    return this.projectionsService.remove(projectionId);
  }
}
