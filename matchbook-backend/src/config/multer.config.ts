import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: 'C:\\Users\\dieg0\\OneDrive\\Documentos\\Projectos-nestJs\\images',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
};
