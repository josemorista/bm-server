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
import { IGenerateAttributesVectorProvider } from '../../../modules/exams/providers/GenerateAttributesVectorProvider/models';
import { PyGenerateAttributesVectorProvider } from '../../../modules/exams/providers/GenerateAttributesVectorProvider/implementations/PyGenerateAttributesVectorProvider';
import { PyMlpSegmentationProvider } from '../../../modules/exams/providers/MlpSegmentationProvider /implementations/PyMlpSegmentationProvider';
import { IMlpSegmentationProvider } from '../../../modules/exams/providers/MlpSegmentationProvider /models/IMlpSegmentationProvider';
import { IMailProvider } from '../../providers/MailProvider/models/IMailProvider';
import { EtherialMailProvider } from '../../providers/MailProvider/implementations/EtherialMailProvider';
import { ITemplateEngineProvider } from '../../providers/TemplateEngineProvider/models/ITemplateEngineProvider';
import { HandleBarsTemplateEngineProvider } from '../../providers/TemplateEngineProvider/implementations/HandleBarsTemplateEngineProvider';
import { IDateProvider } from '../../providers/DateProvider/models/IDateProvider';
import { DayJsDateProvider } from '../../providers/DateProvider/implementations/DayjsDateProvider';
import { SESMailProvider } from '../../providers/MailProvider/implementations/SESMailProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerSingleton<IRandomForestSegmentationProvider>('RandomForestSegmentationProvider', PyRandomForestSegmentationProvider);
container.registerSingleton<IMlpSegmentationProvider>('MlpSegmentationProvider', PyMlpSegmentationProvider);
container.registerSingleton<IPixelCounterProvider>('PixelCounterProvider', NumpyPixelCounterProvider);
container.registerSingleton<IGenerateOverlayImageProvider>('GenerateOverlayImageProvider', SkimageGenerateOverlayImageProvider);
container.registerSingleton<IGenerateAttributesVectorProvider>('GenerateAttributesVectorProvider', PyGenerateAttributesVectorProvider);
container.registerSingleton<ITemplateEngineProvider>('TemplateEngineProvider', HandleBarsTemplateEngineProvider);
container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider);

if (process.env.NODE_ENV === 'development') {
	container.registerSingleton<IMailProvider>('MailProvider', EtherialMailProvider);
} else {
	container.registerSingleton<IMailProvider>('MailProvider', SESMailProvider);
}
