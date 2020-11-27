
import multer from 'multer';
import { uploadConfig } from '../../../config/upload';

export const uploader = multer(uploadConfig);