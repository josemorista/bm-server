import { container } from 'tsyringe';

import { MatPlotLibCalculateImgHistogramProvider } from '../../../modules/exams/providers/CalculateImgHistogramProvider/implementations/MatPlotLibCalculateImgHistogramProvider';
import { ICalculateImgHistogramProvider } from '../../../modules/exams/providers/CalculateImgHistogramProvider/models/ICalculateImgHistogramProvider';
import { SkLearnDecisionTreeClassifierProvider } from '../../../modules/exams/providers/DecisionTreeClassifierProvider/implementations/SkLearnDecisionTreeClassifierProvider';
import { IDecisionTreeClassifierProvider } from '../../../modules/exams/providers/DecisionTreeClassifierProvider/models/IDecisionTreeClassifierProvider';
import { PyDicomDicomClipAndConvertProvider } from '../../../modules/exams/providers/DicomClipAndConvertProvider/implementations/PyDicomDicomClipAndConvertProvider';
import { IDicomClipAndConvertProvider } from '../../../modules/exams/providers/DicomClipAndConvertProvider/models/IDicomClipAndConvertProvider';
import { SkimageExtractRegionsFeaturesProvider } from '../../../modules/exams/providers/ExtractRegionsFeaturesProvider/implementations/SkimageExtractRegionsFeaturesProvider';
import { IExtractRegionsFeaturesProvider } from '../../../modules/exams/providers/ExtractRegionsFeaturesProvider/models/IExtractRegionsFeaturesProvider';
import { OpenCvKMeansSegmentationProvider } from '../../../modules/exams/providers/KMeansSegmentationProvider/implementations/OpenCvKMeansSegmentationProvider/index.';
import { IKMeansSegmentationProvider } from '../../../modules/exams/providers/KMeansSegmentationProvider/models/IKMeansSegmentationProvider';
import { ScipyMedianDenoiseProvider } from '../../../modules/exams/providers/MedianDenoiseProvider/implementations/ScipyMedianDenoiseProvider/index.';
import { IMedianDenoiseProvider } from '../../../modules/exams/providers/MedianDenoiseProvider/models/IMedianDenoiseProvider';
import { SkimageOtsuSegmentationProvider } from '../../../modules/exams/providers/OtsuSegmentationProvider/implementations/SkimageOtsuSegmentationProvider';
import { IOtsuSegmentationProvider } from '../../../modules/exams/providers/OtsuSegmentationProvider/models/IOtsuSegmentationProvider';
import { SkimageRandomWalkerSegmentationProvider } from '../../../modules/exams/providers/RandomWalkerSegmentationProvider/implementations/SkimageRandomWalkerSegmentationProvider';
import { IRandomWalkerSegmentationProvider } from '../../../modules/exams/providers/RandomWalkerSegmentationProvider/models/IRandomWalkerSegmentationProvider';
import { SkimageRobertsEdgeFilterProvider } from '../../../modules/exams/providers/RobertsEdgeFilterProvider/implementations/SkimageRobertsEdgeFilterProvider';
import { IRobertsEdgeFilterProvider } from '../../../modules/exams/providers/RobertsEdgeFilterProvider/models/IRobertsEdgeFilterProvider';
import { SkimageSobelEdgeFilterProvider } from '../../../modules/exams/providers/SobelEdgeFilterProvider/implementations/SkimageSobelEdgeFilterProvider';
import { ISobelEdgeFilterProvider } from '../../../modules/exams/providers/SobelEdgeFilterProvider/models/ISobelEdgeFilterProvider';
import { BCryptHashProvider } from '../../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../../modules/users/providers/HashProvider/models/IHashProvider';
import { DiskStorageProvider } from '../../providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '../../providers/StorageProvider/models/IStorageProvider';


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

container.register<IDecisionTreeClassifierProvider>('DecisionTreeClassifierProvider', SkLearnDecisionTreeClassifierProvider);