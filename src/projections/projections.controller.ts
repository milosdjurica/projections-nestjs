import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProjectionDto, UpdateProjectionDto } from './dto';
import { ProjectionsService } from './projections.service';

@Controller('projections')
export class ProjectionsController {
  constructor(private readonly projectionsService: ProjectionsService) {}

  @Post()
  create(@Body() createProjectionDto: CreateProjectionDto) {
    return this.projectionsService.create(createProjectionDto);
  }

  @Get()
  findAll() {
    return this.projectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectionDto: UpdateProjectionDto) {
    return this.projectionsService.update(+id, updateProjectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectionsService.remove(+id);
  }
}
