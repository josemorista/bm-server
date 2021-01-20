import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { v4 as uuid } from 'uuid';
import { IExam } from '../../entities/models/IExam';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';

interface ICreateExamServiceDTO {
	name: string;
	filename: string;
	patientId: string;
}

export class CreateExamService {

	constructor(private examsRepository: IExamsRepository, private storageProvider: IStorageProvider) { }

	async execute({ filename, name, patientId }: ICreateExamServiceDTO): Promise<IExam> {
		const exam = await this.examsRepository.create({
			id: uuid(),
			currentStep: 0,
			patientId,
			dicomFileURL: await this.storageProvider.save(filename),
			filteringOperations: [],
			minDicomValue: 50,
			maxDicomValue: 500,
			name,
			originalImgURL: null,
			processedImgURL: null,
			segmentationParams: []
		});

		return exam;
	}
}