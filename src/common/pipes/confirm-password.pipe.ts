import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    return value;
  }
}
