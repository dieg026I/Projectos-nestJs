import { NestMiddleware, Injectable } from '@nestjs/common';
import { multerConfig } from '../config/multer.config';
import * as multer from 'multer';

export const upload = multer(multerConfig).array('images', 4);

