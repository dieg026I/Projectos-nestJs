import { multerConfig } from '../config/multer.config';
import * as multer from 'multer';

export const upload = multer(multerConfig).single('image');