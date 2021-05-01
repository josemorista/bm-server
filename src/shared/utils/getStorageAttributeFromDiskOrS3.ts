import { env } from '../env';
import { uploadConfig } from '../../config/upload';

export const getStorageAttributeFromDiskOrS3 = (attribute: string | null): string | null => {
	if (!attribute) return null;
	if (env.storageEngine === 'disk') {
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${attribute}`;
	}
	return null;
};