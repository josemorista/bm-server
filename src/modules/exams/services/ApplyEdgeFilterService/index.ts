import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IExam } from '../../entities/models/IExam';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { ISobelEdgeFilterProvider } from '../../providers/SobelEdgeFilterProvider/models/ISobelEdgeFilterProvider';
import { AppError } from '../../../../shared/errors/AppError';

interface IApplyEdgeFilterServiceDTO {
	id: string;
	method: IExam['edgeFilter'];
}

@injectable()
export class ApplyEdgeFilterService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('SobelEdgeFilterProvider')
		private sobelEdgeFilterProvider: ISobelEdgeFilterProvider
	) { }

	async execute({ method, id }: IApplyEdgeFilterServiceDTO): Promise<void> {

		const exam = await this.examsRepository.findById(id);

		if (!exam.segmentedImgLocation) {
			throw new AppError('no segmented image to process');
		}

		const edgedImgLocation = `edg-${id}.png`;

		if (method === 'sobel') {
			await this.sobelEdgeFilterProvider.applySobel({
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.segmentedImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, edgedImgLocation)
			});
		}

		await this.storageProvider.save(edgedImgLocation);

		await this.examsRepository.updateById(id, {
			...exam,
			edgeFilter: method,
			edgedImgLocation
		});
	}
}