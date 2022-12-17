import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ParseArrayPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectionsService } from '../services';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ChangeFileInterceptor } from '@Src/common/interceptors';
import { checkFileType, fileLimits } from '@Src/common/utils';

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
  @UseInterceptors(
    FileInterceptor('file', {
      limits: fileLimits,
      fileFilter: checkFileType,
    }),
    ChangeFileInterceptor,
  )
  create(
    @Body(new ParseArrayPipe({ items: CreateProjectionDto }))
    listOfProjections: CreateProjectionDto[],
  ) {
    return this.projectionsService.create(listOfProjections);
  }

  @Patch('/:projectionId')
  update(
    @Param('projectionId', ParseIntPipe) projectionId: number,
    @Body() updateProjectionDto: UpdateProjectionDto,
  ) {
    return this.projectionsService.update(projectionId, updateProjectionDto);
  }

  @Delete(':projectionId')
  deleteById(@Param('projectionId', ParseIntPipe) projectionId: number) {
    return this.projectionsService.deleteById(projectionId);
  }

  @Delete()
  deleteMany() {
    return this.projectionsService.deleteMany();
  }
}
