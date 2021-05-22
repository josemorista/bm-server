import { container } from 'tsyringe';
import { PyRandomForestSegmentationProvider } from '../../../modules/exams/providers/RandomForestSegmentationProvider/implementations/PyRandomForestSegmentationProvider';
import { IRandomForestSegmentationProvider } from '../../../modules/exams/providers/RandomForestSegmentationProvider/models/IRandomForestSegmentationProvider';

import { BCryptHashProvider } from '../../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../../modules/users/providers/HashProvider/models/IHashProvider';
import { DiskStorageProvider } from '../../providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '../../providers/StorageProvider/models/IStorageProvider';

import { NumpyPixelCounterProvider } from '../../../modules/exams/providers/PixelCounterProvider/implementations/NumpyPixelCounterProvider';
import { IPixelCounterProvider } from '../../../modules/exams/providers/PixelCounterProvider/models/IPixelCounterProvider';
import { IGenerateOverlayImageProvider } from '../../../modules/exams/providers/GenerateOverlayImageProvider/models/IGenerateOverlayImageProvider';
import { SkimageGenerateOverlayImageProvider } from '../../../modules/exams/providers/GenerateOverlayImageProvider/implementations/SkimageGenerateOverlayImageProvider';


container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerSingleton<IRandomForestSegmentationProvider>('RandomForestSegmentationProvider', PyRandomForestSegmentationProvider);
container.registerSingleton<IPixelCounterProvider>('PixelCounterProvider', NumpyPixelCounterProvider);
container.registerSingleton<IGenerateOverlayImageProvider>('GenerateOverlayImageProvider', SkimageGenerateOverlayImageProvider);