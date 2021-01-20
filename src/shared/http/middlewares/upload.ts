import multer, { diskStorage } from 'multer';
import { uploadConfig } from '../../../config/upload';
import crypto from 'crypto';

export const upload = multer({
	storage: diskStorage({
		destination: uploadConfig.tmpUploadsPath,
		filename: (request, file, callback) => {
			const filename = `${crypto.randomBytes(10).toString('hex')}-${file.originalname}`;
			return callback(null, filename);
		},
	}),
	limits: {
		fileSize: uploadConfig.maxFileSize
	}
});