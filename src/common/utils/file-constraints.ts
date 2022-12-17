import { BadRequestException } from '@nestjs/common';

export const fileLimits = { files: 1, fileSize: 1024 * 20 };

export const checkFileType = (req, file, callback) => {
  if (file.originalname.endsWith('.csv')) {
    callback(null, true);
  } else {
    callback(new BadRequestException('Please provide a CSV file!'), false);
  }
};
