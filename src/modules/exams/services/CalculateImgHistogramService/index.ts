import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { ICalculateImgHistogramProvider } from '../../providers/CalculateImgHistogramProvider/models/ICalculateImgHistogramProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface ICalculateImgHistogramsServiceDTO {
	bins?: number;
	range?: Array<number>;
	id: string;
	calculateHistogramFrom?: 'original' | 'equalized'
}

@injectable()
export class CalculateImgHistogramService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('CalculateImgHistogramProvider')
		private calculateImgHistogramProvider: ICalculateImgHistogramProvider
	) {
	}

	async execute({ id, bins, range, calculateHistogramFrom }: ICalculateImgHistogramsServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);

		if (!exam.originalImgLocation) {
			throw new AppError('no original image location to process');
		}

		if (calculateHistogramFrom === 'original') {
			const originalImgHistogramLocation = `orghist-${exam.id}.png`;
			await this.calculateImgHistogramProvider.calculateImgHistogram({
				bins: bins || 30,
				range: range || [0, 1],
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.originalImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, originalImgHistogramLocation)
			});
			await this.storageProvider.save(originalImgHistogramLocation);
			await this.examsRepository.updateById(id, {
				...exam,
				originalImgHistogramLocation
			});
		}

		if (calculateHistogramFrom === 'equalized') {
			if (!exam.equalizedImgLocation) {
				throw new AppError('no equalized image to process');
			}
			const equalizedImgHistogramLocation = `eqhist-${exam.id}.png`;
			await this.calculateImgHistogramProvider.calculateImgHistogram({
				bins: bins || 30,
				range: range || [0, 1],
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.equalizedImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, equalizedImgHistogramLocation)
			});
			await this.storageProvider.save(equalizedImgHistogramLocation);
			await this.examsRepository.updateById(id, {
				...exam,
				equalizedImgHistogramLocation
			});
		}
	}
}