import { inject, injectable } from 'tsyringe';
import { IExamDetection } from '../../entities/models/IExamDetection';
import { IExtractRegionsFeaturesProvider } from '../../providers/ExtractRegionsFeaturesProvider/models/IExtractRegionsFeaturesProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';

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
		@inject('ExtractRegionsFeaturesProvider')
		private extractRegionsFeaturesProvider: IExtractRegionsFeaturesProvider
	) {

	}

	async execute({ id }: IExtractDetectionsFromImgServiceDTO): Promise<Array<IExamDetection>> {
		const exam = await this.examsRepository.findById(id);

		if (!exam.equalizedImgLocation || !exam.edgedImgLocation) {
			throw new AppError('preProcessing steps not completed');
		}

		if (!exam.patient) {
			throw new AppError('patient not found');
		}

		await this.examsDetectionsRepository.deleteByExamId(exam.id);

		const detectionFeatures = await this.extractRegionsFeaturesProvider.extractRegionsFeatures({
			equalizedImgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.equalizedImgLocation),
			imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.edgedImgLocation)
		});

		const detectionsPromises = detectionFeatures.map(async detection => {
			return await this.examsDetectionsRepository.create({
				id: uuid(),
				...detection,
				examId: id,
				automaticClassificationId: null,
				revisedClassificationId: null
			});
		});

		return await Promise.all(detectionsPromises);
	}
}