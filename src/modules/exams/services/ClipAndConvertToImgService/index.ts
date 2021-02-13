import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IDicomClipAndConvertProvider } from '../../providers/IDicomClipAndConvertProvider/models/IDicomClipAndConvertProvider';

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
		private storageProvider: IStorageProvider,
		@inject('DicomClipAndConvertProvider')
		private dicomClipAndConvertProvider: IDicomClipAndConvertProvider
	) { }

	async execute({ id, maxDicomValue }: ISegmentExamServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);

		this.dicomClipAndConvertProvider.clipAndConvertToImg({
			filePath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFileLocation),
			outFilePath: path.resolve(uploadConfig.tmpUploadsPath, exam.originalImgLocation),
			maxDicomValue
		});

		await this.storageProvider.save(exam.originalImgLocation);

		await this.examsRepository.updateById(exam.id, {
			...exam,
			maxDicomValue
		});
	}
}