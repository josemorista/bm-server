import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IPatientsRepository } from '../../../patients/repositories/PatientsRepository/models/IPatientsRepository';
import { IRandomForestSegmentationProvider } from '../../providers/RandomForestSegmentationProvider/models/IRandomForestSegmentationProvider';

interface IApplySegmentationModelServiceDTO {
	id: string;
}

@injectable()
export class ApplySegmentationModelService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('PatientsRepository')
		private patientsRepository: IPatientsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('RandomForestSegmentationProvider')
		private randomForestSegmentationProvider: IRandomForestSegmentationProvider
	) { }

	async execute({ id }: IApplySegmentationModelServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);

		const { dicomPatientId, pixelArea, originalImagePath, resultImagePath } = await this.randomForestSegmentationProvider.applyModel({
			dcmPath: path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFileLocation),
			outDirectoryPath: uploadConfig.tmpUploadsPath,
			proba: 0.4
		});

		await this.patientsRepository.updatePatientById(exam.patientId, {
			dicomPatientId
		});

		await this.examsRepository.updateById(exam.id, {
			pixelArea,
			originalImageLocation: await this.storageProvider.save(originalImagePath),
			resultImageLocation: await this.storageProvider.save(resultImagePath)
		});
	}
}