import { container } from 'tsyringe';
import { ExamsRepository } from '../../modules/exams/infra/typeorm/repositories/ExamsRepository';
import { PyDicomDicomClipAndConvertProvider } from '../../modules/exams/providers/DicomClipAndConvertProvider/implementations/PyDicomDicomClipAndConvertProvider';
import { IDicomClipAndConvertProvider } from '../../modules/exams/providers/DicomClipAndConvertProvider/models/IDicomClipAndConvertProvider';
import { ScipyMedianDenoiseProvider } from '../../modules/exams/providers/MedianDenoiseProvider/implementations/ScipyMedianDenoiseProvider/index.';
import { IMedianDenoiseProvider } from '../../modules/exams/providers/MedianDenoiseProvider/models/IMedianDenoiseProvider';
import { IExamsRepository } from '../../modules/exams/repositories/ExamsRepository/models/IExamsRepository';
import { PatientsRepository } from '../../modules/patients/infra/typeorm/repositories/PatientsRepository';
import { IPatientsRepository } from '../../modules/patients/repositories/PatientsRepository/models/IPatientsRepository';
import { UsersRepository } from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from '../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../modules/users/repositories/models/IUsersRepository';
import { DiskStorageProvider } from '../providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '../providers/StorageProvider/models/IStorageProvider';
import { IOtsuSegmentationProvider } from '../../modules/exams/providers/OtsuSegmentationProvider/models/IOtsuSegmentationProvider';
import { SkimageOtsuSegmentationProvider } from '../../modules/exams/providers/OtsuSegmentationProvider/implementations/SkimageOtsuSegmentationProvider';
import { ISobelEdgeFilterProvider } from '../../modules/exams/providers/SobelEdgeFilterProvider/models/ISobelEdgeFilterProvider';
import { SkimageSobelEdgeFilterProvider } from '../../modules/exams/providers/SobelEdgeFilterProvider/implementations/SkimageSobelEdgeFilterProvider';
import { IExamsDetectionsRepository } from '../../modules/exams/repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { ExamsDetectionsRepository } from '../../modules/exams/infra/typeorm/repositories/ExamsDetectionsRepository';
import { IExamsDetectionsClassificationsRepository } from '../../modules/exams/repositories/ExamsDetectionsClassificationsRepository/IExamsDetectionsClassificationsRepository';
import { ExamsDetectionsClassificationsRepository } from '../../modules/exams/infra/typeorm/repositories/ExamsDetectionsClassificationsRepository';
import { IExtractRegionsFeaturesProvider } from '../../modules/exams/providers/ExtractRegionsFeaturesProvider/models/IExtractRegionsFeaturesProvider';
import { SkimageExtractRegionsFeaturesProvider } from '../../modules/exams/providers/ExtractRegionsFeaturesProvider/implementations/SkimageExtractRegionsFeaturesProvider';
import { SkimageRobertsEdgeFilterProvider } from '../../modules/exams/providers/RobertsEdgeFilterProvider/implementations/SkimageRobertsEdgeFilterProvider';
import { IRobertsEdgeFilterProvider } from '../../modules/exams/providers/RobertsEdgeFilterProvider/models/IRobertsEdgeFilterProvider';
import { ICalculateImgHistogramProvider } from '../../modules/exams/providers/CalculateImgHistogramProvider/models/ICalculateImgHistogramProvider';
import { MatPlotLibCalculateImgHistogramProvider } from '../../modules/exams/providers/CalculateImgHistogramProvider/implementations/MatPlotLibCalculateImgHistogramProvider';
import { IRandomWalkerSegmentationProvider } from '../../modules/exams/providers/RandomWalkerSegmentationProvider/models/IRandomWalkerSegmentationProvider';
import { SkimageRandomWalkerSegmentationProvider } from '../../modules/exams/providers/RandomWalkerSegmentationProvider/implementations/SkimageRandomWalkerSegmentationProvider';
import { IKMeansSegmentationProvider } from '../../modules/exams/providers/KMeansSegmentationProvider/models/IKMeansSegmentationProvider';
import { OpenCvKMeansSegmentationProvider } from '../../modules/exams/providers/KMeansSegmentationProvider/implementations/OpenCvKMeansSegmentationProvider/index.';


// Providers
container.register<IHashProvider>('HashProvider', BCryptHashProvider);
container.register<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.register<IDicomClipAndConvertProvider>('DicomClipAndConvertProvider', PyDicomDicomClipAndConvertProvider);

container.register<IMedianDenoiseProvider>('MedianDenoiseProvider', ScipyMedianDenoiseProvider);

container.register<IOtsuSegmentationProvider>('OtsuSegmentationProvider', SkimageOtsuSegmentationProvider);
container.register<IRandomWalkerSegmentationProvider>('RandomWalkerSegmentationProvider', SkimageRandomWalkerSegmentationProvider);
container.register<IKMeansSegmentationProvider>('KMeansSegmentationProvider', OpenCvKMeansSegmentationProvider);

container.register<ISobelEdgeFilterProvider>('SobelEdgeFilterProvider', SkimageSobelEdgeFilterProvider);
container.register<IRobertsEdgeFilterProvider>('RobertsEdgeFilterProvider', SkimageRobertsEdgeFilterProvider);

container.register<IExtractRegionsFeaturesProvider>('ExtractRegionsFeaturesProvider', SkimageExtractRegionsFeaturesProvider);

container.register<ICalculateImgHistogramProvider>('CalculateImgHistogramProvider', MatPlotLibCalculateImgHistogramProvider);

// Repositories
container.register<IUsersRepository>('UsersRepository', UsersRepository);
container.register<IPatientsRepository>('PatientsRepository', PatientsRepository);
container.register<IExamsRepository>('ExamsRepository', ExamsRepository);
container.register<IExamsDetectionsRepository>('ExamsDetectionsRepository', ExamsDetectionsRepository);
container.register<IExamsDetectionsClassificationsRepository>('ExamsDetectionsClassificationsRepository', ExamsDetectionsClassificationsRepository);