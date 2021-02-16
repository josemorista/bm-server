import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IExam } from '../../entities/models/IExam';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { IOtsuSegmentationProvider } from '../../providers/OtsuSegmentationProvider/models/IOtsuSegmentationProvider';
import { AppError } from '../../../../shared/errors/AppError';

interface ISegmentImgServiceDTO {
	id: string;
	method: IExam['segmentationMethod'];
}

@injectable()
export class SegmentImgService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('OtsuSegmentationProvider')
		private otsuSegmentationProvider: IOtsuSegmentationProvider
	) { }

	async execute({ method, id }: ISegmentImgServiceDTO): Promise<void> {

		const exam = await this.examsRepository.findById(id);

		if (!exam.equalizedImgLocation) {
			throw new AppError('no equalized image to process');
		}

		const segmentedImgLocation = `seg-${id}.png`;

		if (method === 'otsu') {
			await this.otsuSegmentationProvider.applyOtsuSegmentation({
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.equalizedImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, segmentedImgLocation)
			});
		}

		await this.storageProvider.save(segmentedImgLocation);

		await this.examsRepository.updateById(id, {
			...exam,
			segmentationMethod: method,
			segmentedImgLocation
		});
	}
}