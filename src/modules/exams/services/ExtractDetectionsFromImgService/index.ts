import { inject, injectable } from 'tsyringe';
import { IExamDetection } from '../../entities/models/IExamDetection';
import { IExtractRegionsFeaturesProvider } from '../../providers/ExtractRegionsFeaturesProvider/models/IExtractRegionsFeaturesProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';

export interface IExtractDetectionsFromImgServiceDTO {
	id: string;
}

@injectable()
export class ExtractDetectionsFromImgService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('ExamsDetectionsRepository')
		private examsDetectionsRepository: IExamsDetectionsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('ExtractRegionsFeaturesProvider')
		private extractRegionsFeaturesProvider: IExtractRegionsFeaturesProvider
	) {

	}

	async execute({ id }: IExtractDetectionsFromImgServiceDTO): Promise<Array<IExamDetection>> {
		const exam = await this.examsRepository.findById(id);

		if (!exam.originalImgLocation || !exam.edgedImgLocation) {
			throw new AppError('preProcessing steps not completed');
		}

		if (!exam.patient) {
			throw new AppError('patient not found');
		}

		await this.examsDetectionsRepository.deleteByExamId(exam.id);

		const resumeSegmentationImgLocation = `res-${exam.id}.png`;

		const detectionFeatures = await this.extractRegionsFeaturesProvider.extractRegionsFeatures({
			equalizedImgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.originalImgLocation),
			imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.edgedImgLocation),
			outImgPath: path.resolve(uploadConfig.tmpUploadsPath, resumeSegmentationImgLocation)
		});

		const detectionsPromises = detectionFeatures.map(detection => {
			return this.examsDetectionsRepository.create({
				id: uuid(),
				...detection,
				examId: exam.id,
				automaticClassificationId: null,
				revisedClassificationId: null
			});
		});

		await this.examsRepository.updateById(exam.id, {
			...exam,
			resumeSegmentationImgLocation,
			originalImgLocation: null,
			segmentedImgLocation: null,
			edgedImgLocation: null,
			denoisedImgLocation: null
		});

		await this.storageProvider.remove(exam.originalImgLocation);
		await this.storageProvider.remove(exam.edgedImgLocation);
		await this.storageProvider.remove(exam.denoisedImgLocation || '');
		await this.storageProvider.remove(exam.segmentedImgLocation || '');

		await this.storageProvider.save(resumeSegmentationImgLocation);

		return await Promise.all(detectionsPromises);
	}
}