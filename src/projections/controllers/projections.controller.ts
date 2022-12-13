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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectionDto, UpdateProjectionDto } from '../dto';
import { ProjectionsService } from '../services/projections.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const filename = file.originalname;
          callback(null, filename);
        },
      }),
      fileFilter : (req, file, callback) => {
        if(file.originalname.split('.')[1] !== 'csv'){
          return callback(null, false)
        }
        callback(null, true)
      }
    }),
  )
  create(
    @Body() createProjectionDto: CreateProjectionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);

    return this.projectionsService.create(
      file.originalname,
      createProjectionDto,
    );
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
