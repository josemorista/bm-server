import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';

interface ICreateExamServiceDTO {
	name: string;
	filename: string;
	patientId: string;
}

export class CreateExamService {

	constructor(private examsRepository: IExamsRepository) { }

	async execute({ filename, name, patientId }: ICreateExamServiceDTO) {
		const exam = await this.examsRepository.create({
			currentStep: 0,
			patientId,
			dicomFileURL: filename,
			filteringOperations: [],
			minDicomValue: 50,
			maxDicomValue: 500,
			name,
			originalImgURL: `org-${filename.replace('.dcm', '.png')}`,
			processedImgURL: `proc-${filename.replace('.dcm', '.png')}`,
			segmentationParams: [-1, -1]
		});

		return exam;
	}
}