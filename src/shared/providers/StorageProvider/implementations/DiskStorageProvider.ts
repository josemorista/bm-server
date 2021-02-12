import { IStorageProvider } from '../models/IStorageProvider';
import fs from 'fs';
import { uploadConfig } from '../../../../config/upload';
import path from 'path';

export class DiskStorageProvider implements IStorageProvider {

	async save(tmpFileName: string, fileName?: string): Promise<string> {

		const nameToSave = fileName ? `${fileName}.${tmpFileName.split('.')[1]}` : tmpFileName;

		await fs.promises.copyFile(
			path.join(uploadConfig.tmpUploadsPath, tmpFileName),
			path.join(uploadConfig.diskStorageProviderConfig.destination, nameToSave)
		);
		await fs.promises.unlink(path.join(uploadConfig.tmpUploadsPath, tmpFileName));
		return nameToSave;
	}

	async remove(fileName: string): Promise<void> {
		await fs.promises.unlink(path.join(uploadConfig.diskStorageProviderConfig.destination, fileName));
	}
}