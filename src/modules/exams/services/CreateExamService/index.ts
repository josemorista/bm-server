import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { v4 as uuid } from 'uuid';
import { IExam } from '../../entities/models/IExam';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface ICreateExamServiceDTO {
	label: string;
	filename: string;
	patientId: string;
	category: IExam['category'];
}

@injectable()
export class CreateExamService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider) { }

	async execute({ filename, label, patientId, category }: ICreateExamServiceDTO): Promise<IExam> {
		const id = uuid();

		const dicomFileLocation = await this.storageProvider.save(filename, id);

		const exam = await this.examsRepository.create({
			id,
			label,
			category,
			currentStep: 0,
			patientId,
			dicomFileLocation,
			edgeFilter: null,
			histogramEqualization: null,
			maxDicomValue: 300,
			originalImgLocation: null,
			denoisedImgLocation: null,
			edgedImgLocation: null,
			equalizedImgLocation: null,
			segmentedImgLocation: null,
			equalizedImgHistogramLocation: null,
			originalImgHistogramLocation: null,
			resumeSegmentationImgLocation: null,
			denoiseFilter: null,
			segmentationMethod: null
		});

		return exam;
	}
}