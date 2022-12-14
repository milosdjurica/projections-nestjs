// had to do this otherwise it saves file with some random name
export const editFileName = (req, file, cb) => {
  cb(null, file.originalname);
};

export const fileHelper = (req, file, cb) => {
  if (!file.originalname.endsWith('.csv')) {
    return cb(new Error('only csv file is allowed'), false);
  }
  cb(null, true);
};
