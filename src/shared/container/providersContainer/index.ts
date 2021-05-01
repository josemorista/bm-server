import { container } from 'tsyringe';
import { PyRandomForestSegmentationProvider } from '../../../modules/exams/providers/RandomForestSegmentationProvider/implementations/PyRandomForestSegmentationProvider';
import { IRandomForestSegmentationProvider } from '../../../modules/exams/providers/RandomForestSegmentationProvider/models/IRandomForestSegmentationProvider';

import { BCryptHashProvider } from '../../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../../modules/users/providers/HashProvider/models/IHashProvider';
import { DiskStorageProvider } from '../../providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '../../providers/StorageProvider/models/IStorageProvider';


container.register<IHashProvider>('HashProvider', BCryptHashProvider);
container.register<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.register<IRandomForestSegmentationProvider>('RandomForestSegmentationProvider', PyRandomForestSegmentationProvider);