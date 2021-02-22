import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { IOtsuSegmentationProvider } from '../../providers/OtsuSegmentationProvider/models/IOtsuSegmentationProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IRandomWalkerSegmentationProvider } from '../../providers/RandomWalkerSegmentationProvider/models/IRandomWalkerSegmentationProvider';
import { ILocalOtsuSegmentationProvider } from '../../providers/LocalOtsuSegmentationProvider/models/ILocalOtsuSegmentationProvider';

interface ISegmentImgServiceDTO {
	id: string;
	cumulative: boolean;
	method: 'otsu' | 'randomWalker' | 'localOtsu';
	randomWalkerParams?: {
		markers: Array<number>;
		beta?: number;
	}
	localOtsuParams?: {
		diskSize: number;
	}
}

@injectable()
export class SegmentImgService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('OtsuSegmentationProvider')
		private otsuSegmentationProvider: IOtsuSegmentationProvider,
		@inject('RandomWalkerSegmentationProvider')
		private randomWalkerSegmentationProvider: IRandomWalkerSegmentationProvider,
		@inject('LocalOtsuSegmentationProvider')
		private localOtsuSegmentationProvider: ILocalOtsuSegmentationProvider
	) { }

	async execute({ method, id, randomWalkerParams, localOtsuParams, cumulative }: ISegmentImgServiceDTO): Promise<void> {

		const exam = await this.examsRepository.findById(id);
		let srcPath = '';

		if (exam.equalizedImgLocation) {
			srcPath = path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.equalizedImgLocation);
		}

		if (cumulative) {
			if (!exam.segmentedImgLocation) {
				throw new AppError('no segmented img to process');
			}
			srcPath = path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.segmentedImgLocation);
		}

		const segmentedImgLocation = `seg-${id}.png`;

		if (method === 'otsu') {
			await this.otsuSegmentationProvider.applyOtsuSegmentation({
				imgPath: srcPath,
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, segmentedImgLocation)
			});
		}

		if (method === 'localOtsu') {
			if (!localOtsuParams) {
				throw new AppError('missing random walker params.');
			}
			await this.localOtsuSegmentationProvider.applyLocalOtsuSegmentation({
				imgPath: srcPath,
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, segmentedImgLocation),
				diskSize: localOtsuParams.diskSize
			});
		}

		if (method === 'randomWalker') {
			if (!randomWalkerParams) {
				throw new AppError('missing random walker params.');
			}
			await this.randomWalkerSegmentationProvider.applyRandomWalker({
				imgPath: srcPath,
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, segmentedImgLocation),
				beta: randomWalkerParams.beta || 30,
				markers: randomWalkerParams.markers
			});
		}

		await this.storageProvider.save(segmentedImgLocation);

		await this.examsRepository.updateById(id, {
			...exam,
			segmentedImgLocation
		});
	}
}