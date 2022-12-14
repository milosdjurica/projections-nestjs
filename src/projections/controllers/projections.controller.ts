import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ProjectionsService } from '../services/projections.service';
import { headers } from '../utils/headers';

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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req,
    @Body() createProjectionDto: CreateProjectionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    let arrayOfProjections = req.file.buffer.toString().split('\n');

    for (let i = 1; i < arrayOfProjections.length; i++) {
      let data: any[] = arrayOfProjections[i].split(',');
      data.pop();

      // making a obj for a single projection
      let createProjectionDto = {};
      for (let j = 0; j < data.length; j++) {
        createProjectionDto[headers[j]] = data[j];
      }

      createProjectionDto['pointsScored'] = 0;
      createProjectionDto['granica'] = 0;

      let createdProjection = await this.projectionsService.create(
        createProjectionDto,
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
