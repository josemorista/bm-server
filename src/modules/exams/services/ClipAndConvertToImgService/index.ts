import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { spawnSync } from 'child_process';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';

interface ISegmentExamServiceDTO {
	id: string;
	maxDicomValue: number;
}

@injectable()
export class ClipAndConvertToImgService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) { }

	async execute({ id, maxDicomValue }: ISegmentExamServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);

		spawnSync('python3', [
			path.resolve(__dirname, 'clipAndConvert.py'),
			path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFileLocation),
			path.resolve(uploadConfig.tmpUploadsPath, exam.originalImgLocation),
			String(maxDicomValue)
		]);

		await this.storageProvider.save(exam.originalImgLocation);

		await this.examsRepository.updateById(exam.id, {
			...exam,
			maxDicomValue
		});
	}
}