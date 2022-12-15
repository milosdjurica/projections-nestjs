import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  ParseArrayPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ChangeFileInterceptor } from '../interceptors/changefile.interceptor';
import { ProjectionsService } from '../services/projections.service';
import { editFileName, fileHelper } from '../interceptors/filehelper';

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
      storage:
        // memoryStorage()._handleFile(),
        diskStorage({
          destination: './files',
          filename: editFileName,
        }),
      fileFilter: fileHelper,
    }),
    ChangeFileInterceptor,
  )
  async create(
    @Req() request,
    @Body(new ParseArrayPipe({ items: CreateProjectionDto }))
    listOfProjections: CreateProjectionDto[],
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    for (let singleProjection of listOfProjections) {
      request.body = singleProjection;
      this.createSingleProjection(singleProjection);
    }
    return `Succesfully created all projections!`;
  }

  @Post('createSingleProjection')
  createSingleProjection(@Body() createProjectionDto: CreateProjectionDto) {
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
  deleteById(@Param('projectionId', ParseIntPipe) projectionId: number) {
    return this.projectionsService.deleteById(projectionId);
  }

  @Delete()
  deleteMany() {
    return this.projectionsService.deleteMany();
  }
}
