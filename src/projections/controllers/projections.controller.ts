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
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectionsService } from '../services';
import {
  CreateProjectionDto,
  QueryProjectionsDto,
  UpdateProjectionDto,
} from '../dto';
import { ChangeFileInterceptor } from '@Src/common/interceptors';
import { checkFileType, fileLimits } from '@Src/common/utils';
import { AdminGuard } from '@Src/common/guards';

@Controller('projections')
export class ProjectionsController {
  constructor(private readonly projectionsService: ProjectionsService) {}

  @Get()
  findProjections(@Query() queryProjections: QueryProjectionsDto) {
    if (queryProjections.lastName) {
      return this.projectionsService.findByLastName(queryProjections.lastName);
    }
    return this.projectionsService.findAll();
  }

  @Get(':projectionId')
  findOne(@Param('projectionId', ParseIntPipe) projectionId: number) {
    return this.projectionsService.findOne(projectionId);
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Patch('/:projectionId')
  update(
    @Param('projectionId', ParseIntPipe) projectionId: number,
    @Body() updateProjectionDto: UpdateProjectionDto,
  ) {
    return this.projectionsService.update(projectionId, updateProjectionDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':projectionId')
  deleteById(@Param('projectionId', ParseIntPipe) projectionId: number) {
    return this.projectionsService.deleteById(projectionId);
  }

  @UseGuards(AdminGuard)
  @Delete()
  deleteMany() {
    return this.projectionsService.deleteMany();
  }
}
