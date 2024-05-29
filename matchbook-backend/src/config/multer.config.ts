import { diskStorage } from 'multer';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'images'),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, '/images-' + file.fieldname + '-' + uniqueSuffix)
    }
  })
};