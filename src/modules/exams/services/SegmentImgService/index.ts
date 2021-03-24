import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { IOtsuSegmentationProvider } from '../../providers/OtsuSegmentationProvider/models/IOtsuSegmentationProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IRandomWalkerSegmentationProvider } from '../../providers/RandomWalkerSegmentationProvider/models/IRandomWalkerSegmentationProvider';
import { IKMeansSegmentationProvider } from '../../providers/KMeansSegmentationProvider/models/IKMeansSegmentationProvider';

interface ISegmentImgServiceDTO {
	id: string;
	cumulative: boolean;
	method: 'otsu' | 'randomWalker' | 'kMeans';
	randomWalkerParams?: {
		markers: Array<number>;
		beta?: number;
	};
	kMeansParams?: {
		clusters: number;
		thresholdCluster: number;
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
		@inject('KMeansSegmentationProvider')
		private kMeansSegmentationProvider: IKMeansSegmentationProvider
	) { }

	async execute({ method, id, randomWalkerParams, cumulative, kMeansParams }: ISegmentImgServiceDTO): Promise<void> {

		const exam = await this.examsRepository.findById(id);
		let srcPath = '';

		if (exam.denoisedImgLocation) {
			srcPath = path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.denoisedImgLocation);
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

		if (method === 'kMeans') {
			if (!kMeansParams) {
				throw new AppError('missing KMeans params');
			}
			await this.kMeansSegmentationProvider.applyKMeansSegmentation({
				imgPath: srcPath,
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, segmentedImgLocation),
				clusters: kMeansParams.clusters,
				thresholdCluster: kMeansParams.thresholdCluster
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