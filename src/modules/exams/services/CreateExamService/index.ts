import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { v4 as uuid } from 'uuid';
import { IExam } from '../../entities/models/IExam';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';

interface ICreateExamServiceDTO {
	label: string;
	filename: string;
	patientId: string;
}

export class CreateExamService {

	constructor(private examsRepository: IExamsRepository, private storageProvider: IStorageProvider) { }

	async execute({ filename, label, patientId }: ICreateExamServiceDTO): Promise<IExam> {
		const dicomFileLocation = await this.storageProvider.save(filename);
		const id = uuid();

		const exam = await this.examsRepository.create({
			id,
			label,
			currentStep: 0,
			patientId,
			dicomFileLocation,
			edgeFilter: null,
			histogramEqualization: null,
			maxDicomValue: 300,
			originalImgLocation: `org-${id}.png`,
			processedImgLocation: `proc-${id}.png`,
			denoiseFilter: null,
			segmentationMethod: null
		});

		return exam;
	}
}