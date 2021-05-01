import { container } from 'tsyringe';

import { PyDicomDicomClipAndConvertProvider } from '../../../modules/exams/providers/DicomClipAndConvertProvider/implementations/PyDicomDicomClipAndConvertProvider';
import { IDicomClipAndConvertProvider } from '../../../modules/exams/providers/DicomClipAndConvertProvider/models/IDicomClipAndConvertProvider';

import { BCryptHashProvider } from '../../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../../modules/users/providers/HashProvider/models/IHashProvider';
import { DiskStorageProvider } from '../../providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '../../providers/StorageProvider/models/IStorageProvider';


container.register<IHashProvider>('HashProvider', BCryptHashProvider);
container.register<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.register<IDicomClipAndConvertProvider>('DicomClipAndConvertProvider', PyDicomDicomClipAndConvertProvider);