import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: 'C:\\Projectos-nestJs\\images',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
};
