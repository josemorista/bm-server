import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IPatientsRepository } from '../../../patients/repositories/PatientsRepository/models/IPatientsRepository';
import { IRandomForestSegmentationProvider } from '../../providers/RandomForestSegmentationProvider/models/IRandomForestSegmentationProvider';
import { ISegmentedExamsRepository } from '../../repositories/SegmentedExamsRepository/models/ISegmentedExamsRepository';
import { ISegmentedExam } from '../../entities/models/ISegmentedExam';

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
		private randomForestSegmentationProvider: IRandomForestSegmentationProvider
	) { }

	async execute({ id, algorithm, randomForestParams }: IApplySegmentationModelServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);

		const alreadySegmented = await this.segmentedExamsRepository.findByExamIdAndAlgorithm({
			examId: id,
			algorithm
		});

		if (alreadySegmented) {
			if (alreadySegmented.algorithm === 'randomForest' && randomForestParams?.threshold === alreadySegmented.threshold) return;
			if (alreadySegmented.algorithm === 'SVM') return;
		}

		const { dicomPatientId, pixelArea, originalImagePath, resultImagePath, edgeImagePath } = await this.randomForestSegmentationProvider
			.applyModel({
				dcmPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFileLocation),
				outDirectoryPath: uploadConfig.tmpUploadsPath,
				proba: randomForestParams?.threshold || 0.4
			});

		await this.patientsRepository.updatePatientById(exam.patientId, {
			dicomPatientId
		});

		await this.examsRepository.updateById(exam.id, {
			pixelArea,
			originalImageLocation: await this.storageProvider.save(originalImagePath),
			resultImageLocation: await this.storageProvider.save(resultImagePath),
			edgedResultImageLocation: await this.storageProvider.save(edgeImagePath)
		});
	}
}