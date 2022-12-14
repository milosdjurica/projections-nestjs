import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as fs from 'fs/promises';
import { CreateProjectionDto } from '../dto';
import { headers } from '../utils/headers';

@Injectable()
export class ChangeFileInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('Before...');

    let request = context.switchToHttp().getRequest();
    const filepath = `./${request.file.destination}/${request.file.filename}`;
    const fileContent = await fs.readFile(filepath, 'utf-8');

    let arrayOfProjections = fileContent.split('\n');
    let arr = [];

    for (let i = 1; i < arrayOfProjections.length; i++) {
      if (arrayOfProjections[i].length === 0) continue;
      let dataArray: any[] = arrayOfProjections[i].split(',');
      dataArray.pop();
      let oneProjection: CreateProjectionDto = new CreateProjectionDto();

      for (let j = 0; j < dataArray.length; j++) {
        if (headers[j] === 'id') {
          oneProjection[headers[j]] = dataArray[j];
        } else if (headers[j] === 'lastName') {
          oneProjection[headers[j]] = dataArray[j];
        } else if (headers[j] === 'firstName') {
          oneProjection[headers[j]] = dataArray[j];
        } else if (headers[j] === 'team') {
          oneProjection[headers[j]] = dataArray[j];
        } else if (headers[j] === 'position') {
          oneProjection[headers[j]] = dataArray[j];
        } else if (headers[j] === 'opponent') {
          oneProjection[headers[j]] = dataArray[j];
        } else if (headers[j] === 'injury') {
          oneProjection[headers[j]] = dataArray[j];
        } else {
          oneProjection[headers[j]] = Number(dataArray[j]);
        }
      }

      oneProjection['pointsScored'] = 0;
      oneProjection['granica'] = 0;

      arr.push(oneProjection);
    }
    request.body = arr;
    return next.handle();
  }
}
