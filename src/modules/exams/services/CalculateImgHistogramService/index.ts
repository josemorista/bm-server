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
	calculateHistogramFrom: 'original' | 'denoised' | 'segmented'
}

@injectable()
export class CalculateImgHistogramService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('CalculateImgHistogramProvider')
		private calculateImgHistogramProvider: ICalculateImgHistogramProvider
	) {
	}

	async execute({ id, bins, range, calculateHistogramFrom }: ICalculateImgHistogramsServiceDTO): Promise<string> {
		const exam = await this.examsRepository.findById(id);

		const outImgPath = path.resolve(uploadConfig.tmpUploadsPath, `hist-${exam.id}.png`);

		let src = null;

		if (calculateHistogramFrom === 'original' && exam.originalImgLocation) {
			src = exam.originalImgLocation;
		}

		if (calculateHistogramFrom === 'denoised' && exam.denoisedImgLocation) {
			src = exam.denoisedImgLocation;
		}

		if (calculateHistogramFrom === 'segmented' && exam.denoisedImgLocation) {
			src = exam.denoisedImgLocation;
		}

		if (!src) {
			throw new AppError('Image not found to process');
		}

		if (calculateHistogramFrom === 'original') {
			await this.calculateImgHistogramProvider.calculateImgHistogram({
				bins: bins || 30,
				range: range || [0, 1],
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, src),
				outImgPath
			});
		}

		return outImgPath;

	}
}