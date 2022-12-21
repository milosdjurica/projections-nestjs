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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Projection } from '@Src/database/schemas';

@ApiBearerAuth()
@ApiTags('Projections')
@Controller('projections')
export class ProjectionsController {
  constructor(private readonly projectionsService: ProjectionsService) {}

  @Get()
  findProjections(
    @Query() queryProjections: QueryProjectionsDto,
  ): Promise<Projection[]> {
    return this.projectionsService.findByName(queryProjections);
  }

  @Get(':projectionId')
  findOne(
    @Param('projectionId', ParseIntPipe) projectionId: number,
  ): Promise<Projection> {
    return this.projectionsService.findOne(projectionId);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          example: 'file.csv',
        },
      },
    },
  })
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
  ): Promise<Projection[]> {
    return this.projectionsService.create(listOfProjections);
  }

  @UseGuards(AdminGuard)
  @Patch('/:projectionId')
  update(
    @Param('projectionId', ParseIntPipe) projectionId: number,
    @Body() updateProjectionDto: UpdateProjectionDto,
  ): Promise<Projection> {
    return this.projectionsService.update(projectionId, updateProjectionDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':projectionId')
  deleteById(
    @Param('projectionId', ParseIntPipe) projectionId: number,
  ): Promise<Projection> {
    return this.projectionsService.deleteById(projectionId);
  }

  @UseGuards(AdminGuard)
  @Delete()
  deleteMany(): Promise<boolean> {
    return this.projectionsService.deleteMany();
  }
}
