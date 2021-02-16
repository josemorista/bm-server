import { inject, injectable } from 'tsyringe';
import { IExamDetection } from '../../entities/models/IExamDetection';
import { IExtractRegionsFeaturesProvider } from '../../providers/ExtractRegionsFeaturesProvider/models/IExtractRegionsFeaturesProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';

export interface IExtractDetectionsFromImgDTO {
	id: string;
}

@injectable()
export class ExtractDetectionsFromImg {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('ExamsDetectionsRepository')
		private examsDetectionsRepository: IExamsDetectionsRepository,
		@inject('ExtractRegionsFeaturesProvider')
		private extractRegionsFeaturesProvider: IExtractRegionsFeaturesProvider
	) {

	}

	async execute({ id }: IExtractDetectionsFromImgDTO): Promise<Array<IExamDetection>> {
		const exam = await this.examsRepository.findById(id);

		if (!exam.equalizedImgLocation || !exam.edgedImgLocation) {
			throw new AppError('preProcessing steps not completed');
		}

		if (!exam.patient) {
			throw new AppError('patient not found');
		}

		const detectionFeatures = await this.extractRegionsFeaturesProvider.extractRegionsFeatures({
			equalizedImgPath: exam.equalizedImgLocation,
			imgPath: exam.edgedImgLocation
		});

		const detectionsPromises = detectionFeatures.map(async detection => {
			return await this.examsDetectionsRepository.create({
				...detection,
				examId: id,
				automaticClassificationId: null,
				revisedClassificationId: null
			});
		});

		return await Promise.all(detectionsPromises);
	}
}