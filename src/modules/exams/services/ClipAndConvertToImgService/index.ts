import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IDicomClipAndConvertProvider } from '../../providers/DicomClipAndConvertProvider/models/IDicomClipAndConvertProvider';
import { IPatientsRepository } from '../../../patients/repositories/PatientsRepository/models/IPatientsRepository';

interface ISegmentExamServiceDTO {
	id: string;
}

@injectable()
export class ClipAndConvertToImgService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('PatientsRepository')
		private patientsRepository: IPatientsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('DicomClipAndConvertProvider')
		private dicomClipAndConvertProvider: IDicomClipAndConvertProvider
	) { }

	async execute({ id }: ISegmentExamServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);
		const originalImgLocation = `org-${id}.png`;

		const { patientId, pixelArea } = await this.dicomClipAndConvertProvider.clipAndConvertToImg({
			filePath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFileLocation),
			outFilePath: path.resolve(uploadConfig.tmpUploadsPath, originalImgLocation),
			maxDicomValue: 200
		});

		await this.patientsRepository.updatePatientById(exam.patientId, {
			dicomPatientId: patientId
		});

		await this.storageProvider.save(originalImgLocation);

		await this.examsRepository.updateById(exam.id, {
			pixelArea,
			originalImgLocation,
			currentStep: 'convertAndClip'
		});
	}
}