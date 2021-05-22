import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IPatientsRepository } from '../../../patients/repositories/PatientsRepository/models/IPatientsRepository';
import { IRandomForestSegmentationProvider } from '../../providers/RandomForestSegmentationProvider/models/IRandomForestSegmentationProvider';
import { ISegmentedExamsRepository } from '../../repositories/SegmentedExamsRepository/models/ISegmentedExamsRepository';
import { ISegmentedExam } from '../../entities/models/ISegmentedExam';
import { IPixelCounterProvider } from '../../providers/PixelCounterProvider/models/IPixelCounterProvider';

interface IApplySegmentationModelServiceDTO {
	id: string;
	algorithm: ISegmentedExam['algorithm'];
	randomForestParams?: {
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
		@inject('RandomForestSegmentationProvider')
		private randomForestSegmentationProvider: IRandomForestSegmentationProvider,
		@inject('PixelCounterProvider')
		private pixelCounterProvider: IPixelCounterProvider
	) { }

	async execute({ id, algorithm, randomForestParams }: IApplySegmentationModelServiceDTO): Promise<ISegmentedExam> {
		const exam = await this.examsRepository.findById(id);

		const alreadySegmented = await this.segmentedExamsRepository.findByExamIdAndAlgorithm({
			examId: id,
			algorithm
		});

		if (alreadySegmented) {
			if (alreadySegmented.algorithm === 'randomForest' && randomForestParams?.threshold === alreadySegmented.threshold) return alreadySegmented;
			if (alreadySegmented.algorithm === 'SVM') return alreadySegmented;
		}

		const threshold = randomForestParams?.threshold || 0.4;
		const { dicomPatientId, pixelArea, originalImagePath, resultImagePath, edgeImagePath } = await this.randomForestSegmentationProvider
			.applyModel({
				dcmPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFileLocation),
				outDirectoryPath: uploadConfig.tmpUploadsPath,
				proba: threshold
			});

		await this.patientsRepository.updatePatientById(exam.patientId, {
			dicomPatientId
		});

		const affectedPixels = await this.pixelCounterProvider.countNotNullPixels(
			path.resolve(uploadConfig.tmpUploadsPath, resultImagePath)
		);

		await this.examsRepository.updateById(exam.id, {
			pixelArea,
			originalImageLocation: await this.storageProvider.save(originalImagePath),
			resultImageLocation: await this.storageProvider.save(resultImagePath),
			edgedResultImageLocation: await this.storageProvider.save(edgeImagePath)
		});

		await this.segmentedExamsRepository.deleteByExamId(exam.id);

		return (await this.segmentedExamsRepository.create({
			examId: exam.id,
			affectedArea: Math.round(affectedPixels * pixelArea),
			algorithm,
			threshold
		}));

	}
}