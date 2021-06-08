import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import fs from 'fs';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IPatientsRepository } from '../../../patients/repositories/PatientsRepository/models/IPatientsRepository';
import { IRandomForestSegmentationProvider } from '../../providers/RandomForestSegmentationProvider/models/IRandomForestSegmentationProvider';
import { ISegmentedExamsRepository } from '../../repositories/SegmentedExamsRepository/models/ISegmentedExamsRepository';
import { ISegmentedExam } from '../../entities/models/ISegmentedExam';
import { IPixelCounterProvider } from '../../providers/PixelCounterProvider/models/IPixelCounterProvider';
import { IGenerateOverlayImageProvider } from '../../providers/GenerateOverlayImageProvider/models/IGenerateOverlayImageProvider';
import { IMlpSegmentationProvider } from '../../providers/MlpSegmentationProvider /models/IMlpSegmentationProvider';
import { IGenerateAttributesVectorProvider } from '../../providers/GenerateAttributesVectorProvider/models';
import { AppError } from '../../../../shared/errors/AppError';
import { INaiveBayesSegmentationProvider } from '../../providers/NaiveBayesSegmentationProvider/models/INaiveBayesSegmentationProvider';

interface IApplySegmentationModelServiceDTO {
	id: string;
	algorithm: ISegmentedExam['algorithm'];
	params?: {
		threshold: number;
	}
}

@injectable()
export class ApplySegmentationModelService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('PatientsRepository')
		private patientsRepository: IPatientsRepository,
		@inject('SegmentedExamsRepository')
		private segmentedExamsRepository: ISegmentedExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('GenerateAttributesVectorProvider')
		private generateAttributesVector: IGenerateAttributesVectorProvider,
		@inject('RandomForestSegmentationProvider')
		private randomForestSegmentationProvider: IRandomForestSegmentationProvider,
		@inject('MlpSegmentationProvider')
		private mlpSegmentationProvider: IMlpSegmentationProvider,
		@inject('NaiveBayesSegmentationProvider')
		private naiveBayesSegmentationProvider: INaiveBayesSegmentationProvider,
		@inject('PixelCounterProvider')
		private pixelCounterProvider: IPixelCounterProvider,
		@inject('GenerateOverlayImageProvider')
		private generateImageOverlayProvider: IGenerateOverlayImageProvider
	) { }

	async execute({ id, algorithm, params }: IApplySegmentationModelServiceDTO): Promise<ISegmentedExam> {
		const exam = await this.examsRepository.findById(id);

		const alreadySegmented = await this.segmentedExamsRepository.findByExamIdAndAlgorithm({
			examId: id,
			algorithm
		});

		if (alreadySegmented) {
			if (['randomForest', 'MLP', 'naiveBayes'].includes(alreadySegmented.algorithm) && params?.threshold === alreadySegmented.threshold) return alreadySegmented;
			if (alreadySegmented.algorithm === 'SVM') return alreadySegmented;
		}

		const threshold = params?.threshold ?? 0.4;

		const { dicomPatientId, pixelArea, originalImagePath, attributesCsvPath, rows, cols } = await this.generateAttributesVector
			.generate({
				dcmPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFileLocation),
				outDirectoryPath: uploadConfig.tmpUploadsPath
			});

		let segmented: { edgeImagePath: string, resultImagePath: string } | undefined = undefined;

		segmented = await (option => {
			const options = {
				'MLP': this.mlpSegmentationProvider.applyModel({
					csvPath: path.resolve(uploadConfig.tmpUploadsPath, attributesCsvPath),
					outDirectoryPath: uploadConfig.tmpUploadsPath,
					proba: threshold,
					shape: [rows, cols]
				}),
				'randomForest': this.randomForestSegmentationProvider.applyModel({
					csvPath: path.resolve(uploadConfig.tmpUploadsPath, attributesCsvPath),
					outDirectoryPath: uploadConfig.tmpUploadsPath,
					proba: threshold,
					shape: [rows, cols]
				}),
				'SVM': undefined,
				'naiveBayes': this.naiveBayesSegmentationProvider.applyModel({
					csvPath: path.resolve(uploadConfig.tmpUploadsPath, attributesCsvPath),
					outDirectoryPath: uploadConfig.tmpUploadsPath,
					proba: threshold,
					shape: [rows, cols]
				}),
			};
			return options[option];
		})(algorithm);


		if (!segmented) {
			throw new AppError('Invalid request');
		}

		const { edgeImagePath, resultImagePath } = segmented;

		const overlayImagePath = await this.generateImageOverlayProvider.apply({
			originalImagePath: path.resolve(uploadConfig.tmpUploadsPath, originalImagePath),
			edgeImagePath: path.resolve(uploadConfig.tmpUploadsPath, edgeImagePath),
			outDirPath: uploadConfig.tmpUploadsPath
		});

		await this.patientsRepository.updatePatientById(exam.patientId, {
			dicomPatientId
		});

		const affectedPixels = await this.pixelCounterProvider.countNotNullPixels(
			path.resolve(uploadConfig.tmpUploadsPath, resultImagePath)
		);

		const classifiedArea = await this.pixelCounterProvider.countNotNullPixels(
			path.resolve(uploadConfig.tmpUploadsPath, originalImagePath)
		);

		await this.examsRepository.updateById(exam.id, {
			pixelArea,
			originalImageLocation: await this.storageProvider.save(originalImagePath),
			resultImageLocation: await this.storageProvider.save(resultImagePath),
			edgedResultImageLocation: await this.storageProvider.save(edgeImagePath),
			overlayImageLocation: await this.storageProvider.save(overlayImagePath)
		});

		await this.segmentedExamsRepository.deleteByExamId(exam.id);

		await fs.promises.unlink(path.resolve(uploadConfig.tmpUploadsPath, attributesCsvPath));

		return (await this.segmentedExamsRepository.create({
			examId: exam.id,
			affectedArea: Number((affectedPixels * pixelArea).toFixed(2)),
			classifiedArea: Number((classifiedArea * pixelArea).toFixed(2)),
			algorithm,
			threshold
		}));

	}
}