import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IExam } from '../../entities/models/IExam';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { ISobelEdgeFilterProvider } from '../../providers/SobelEdgeFilterProvider/models/ISobelEdgeFilterProvider';

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

		if (method === 'sobel') {
			await this.sobelEdgeFilterProvider.applySobel({
				imgPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.processedImgLocation),
				outImgPath: path.resolve(uploadConfig.tmpUploadsPath, exam.processedImgLocation)
			});
		}

		await this.storageProvider.save(exam.processedImgLocation);

		await this.examsRepository.updateById(id, {
			...exam,
			edgeFilter: method
		});
	}
}