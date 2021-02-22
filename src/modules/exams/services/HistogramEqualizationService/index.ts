import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IExam } from '../../entities/models/IExam';
import { IAdapthistEqualizeHistogramProvider } from '../../providers/AdapthistEqualizeHistogramProvider/models/IAdapthistEqualizeHistogramProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { AppError } from '../../../../shared/errors/AppError';
import fs from 'fs';

interface IHistogramEqualizationServiceDTO {
	id: string;
	method: 'adapthist' | 'none';
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

		if (!exam.denoisedImgLocation) {
			throw new AppError('no denoised image to process');
		}

		const equalizedImgLocation = `eq-${id}.png`;

		if (method === 'adapthist') {
			await this.adapthistEqualizeHistogramProvider.applyAdapthistHistogramEqualization({
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.denoisedImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, equalizedImgLocation)
			});
		}

		if (method === 'none') {
			await fs.promises.copyFile(path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.denoisedImgLocation),
				path.resolve(uploadConfig.tmpUploadsPath, equalizedImgLocation));
		}

		await this.storageProvider.save(equalizedImgLocation);

		await this.examsRepository.updateById(id, {
			...exam,
			equalizedImgLocation
		});
	}
}