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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Projection } from '@Src/database/schemas';
import {
  ProjectionsOperations,
  ProjectionsResponses,
} from '@Src/common/swagger';

@ApiBearerAuth('JWT')
@ApiTags('Projections')
@Controller('projections')
export class ProjectionsController {
  constructor(private readonly projectionsService: ProjectionsService) {}

  @ApiOperation(ProjectionsOperations.get)
  @ApiResponse({ ...ProjectionsResponses.get, type: [Projection] })
  @Get()
  findProjections(
    @Query() queryProjections: QueryProjectionsDto,
  ): Promise<Projection[]> {
    return this.projectionsService.findByName(queryProjections);
  }

  @ApiOperation(ProjectionsOperations.getSingle)
  @ApiResponse(ProjectionsResponses.getSingle)
  @Get(':projectionId')
  findOne(
    @Param('projectionId', ParseIntPipe) projectionId: number,
  ): Promise<Projection> {
    return this.projectionsService.findOne(projectionId);
  }

  @ApiOperation(ProjectionsOperations.create)
  @ApiResponse({ ...ProjectionsResponses.create, type: [Projection] })
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

  @ApiOperation(ProjectionsOperations.update)
  @ApiResponse(ProjectionsResponses.update)
  @UseGuards(AdminGuard)
  @Patch('/:projectionId')
  update(
    @Param('projectionId', ParseIntPipe) projectionId: number,
    @Body() updateProjectionDto: UpdateProjectionDto,
  ): Promise<Projection> {
    return this.projectionsService.update(projectionId, updateProjectionDto);
  }

  @ApiOperation(ProjectionsOperations.deleteSingle)
  @ApiResponse(ProjectionsResponses.deleteSinge)
  @UseGuards(AdminGuard)
  @Delete(':projectionId')
  deleteById(
    @Param('projectionId', ParseIntPipe) projectionId: number,
  ): Promise<Projection> {
    return this.projectionsService.deleteById(projectionId);
  }

  @ApiOperation(ProjectionsOperations.delete)
  @ApiResponse(ProjectionsResponses.delete)
  @UseGuards(AdminGuard)
  @Delete()
  deleteMany(): Promise<boolean> {
    return this.projectionsService.deleteMany();
  }
}
