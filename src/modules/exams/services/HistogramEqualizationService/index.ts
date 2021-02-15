import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IExam } from '../../entities/models/IExam';
import { IAdapthistEqualizeHistogramProvider } from '../../providers/AdapthistEqualizeHistogramProvider/models/IAdapthistEqualizeHistogramProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';

interface IHistogramEqualizationServiceDTO {
	id: string;
	method: IExam['histogramEqualization'];
}

@injectable()
export class HistogramEqualizationService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('AdapthistEqualizeHistogramProvider')
		private adapthistEqualizeHistogramProvider: IAdapthistEqualizeHistogramProvider
	) { }

	async execute({ method, id }: IHistogramEqualizationServiceDTO): Promise<void> {

		const exam = await this.examsRepository.findById(id);

		if (method === 'adapthist') {
			await this.adapthistEqualizeHistogramProvider.applyAdapthistHistogramEqualization({
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.processedImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, exam.processedImgLocation)
			});
		}

		await this.storageProvider.save(exam.processedImgLocation);

		await this.examsRepository.updateById(id, {
			...exam,
			histogramEqualization: method
		});
	}
}