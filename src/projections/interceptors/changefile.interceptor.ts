import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateProjectionDto } from '../dto';
import { headers } from '../utils/headers';

@Injectable()
export class ChangeFileInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const arrayOfProjections = this.getArrayOfProjections(request);
    const reqBody = this.handleReqBody(arrayOfProjections);

    request.body = reqBody;
    return next.handle();
  }

  getArrayOfProjections(request): string[] {
    const fileContent = request.file.buffer.toString();
    return fileContent.split('\n');
  }

  handleReqBody(arrayOfProjections): CreateProjectionDto[] {
    let reqBody = [];
    for (let i = 1; i < arrayOfProjections.length; i++) {
      if (arrayOfProjections[i].length === 0) continue;

      let dataArray = arrayOfProjections[i].split(',');
      dataArray.pop();

      let oneProjection = this.handleProjectionData(dataArray);
      reqBody.push(oneProjection);
    }
    return reqBody;
  }

  handleProjectionData(dataArray): CreateProjectionDto {
    let oneProjection: CreateProjectionDto = new CreateProjectionDto();

    for (let j = 0; j < dataArray.length; j++) {
      if (dataArray[j] == '0.00' || dataArray[j] == '0.000') {
        oneProjection[headers[j]] = 0;
      } else if (parseFloat(dataArray[j])) {
        oneProjection[headers[j]] = parseFloat(dataArray[j]);
      } else {
        oneProjection[headers[j]] = dataArray[j];
      }
    }
    oneProjection['pointsScored'] = 0;
    oneProjection['granica'] = 0;
    return oneProjection;
  }
}
