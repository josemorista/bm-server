import path from 'path';
import { env } from '../shared/env';

export const uploadConfig = {
	tmpUploadsPath: path.resolve(__dirname, '..', '..', 'tmp'),
	maxFileSize: 10240000,
	diskStorageProviderConfig: {
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		publicUrl: `${env.apiUrl}/uploads`
	}
};