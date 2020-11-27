import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const uploadsDirectory = path.resolve(__dirname, '..', '..', 'uploads');

export const uploadConfig = {
	storage: multer.diskStorage({
		destination: uploadsDirectory,
		filename: (request, file, callback) => {
			const filename = `${crypto.randomBytes(10).toString('hex')}-${file.originalname}`;
			return callback(null, filename);
		}
	})
};