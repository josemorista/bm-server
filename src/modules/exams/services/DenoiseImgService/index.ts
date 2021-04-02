import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IMedianDenoiseProvider } from '../../providers/MedianDenoiseProvider/models/IMedianDenoiseProvider';
import { AppError } from '../../../../shared/errors/AppError';

interface IDenoiseImgServiceDTO {
	id: string;
	method: 'median';
	size?: number;
}

@injectable()
export class DenoiseImgService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('MedianDenoiseProvider')
		private medianDenoiseProvider: IMedianDenoiseProvider
	) { }

	async execute({ id, method, size }: IDenoiseImgServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);

		if (!method || !['median'].includes(method)) {
			throw new AppError('invalid denoise method');
		}

		if (!exam.originalImgLocation) {
			throw new AppError('no original image to process');
		}

		const denoisedImgLocation = `den-${id}.png`;

		if (method === 'median') {
			this.medianDenoiseProvider.applyMedianFilter({
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.originalImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, denoisedImgLocation),
				size: size || 3
			});
		}

		await this.storageProvider.save(denoisedImgLocation);

		await this.examsRepository.updateById(exam.id, {
			denoisedImgLocation,
			currentStep: 'denoise'
		});
	}
}