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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ChangeFileInterceptor } from '../interceptors/changefile.interceptor';
import { ProjectionsService } from '../services/projections.service';
import { editFileName, fileHelper } from '../interceptors/filehelper';
import { request } from 'http';

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
    @Body() listOfProjections: CreateProjectionDto[],
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    // console.log(request.body);
    for (let singleProjection of listOfProjections) {
      // console.log(singleProjection);
      let createdProjection = await this.projectionsService.create(
        singleProjection,
      );
      if (!createdProjection)
        return 'There was an error, some projections were not added';
    }
    return `Succesfully created all projections!`;
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
