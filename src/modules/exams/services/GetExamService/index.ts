import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';

export class GetExamService {

	constructor(private examsRepository: IExamsRepository) { }

	async execute(id: string) {
		const exam = await this.examsRepository.findById(id);
		if (exam) {
			exam.dicomFileURL = `${process.env.baseURL}${exam.dicomFileURL}`;
			exam.originalImgURL = `${process.env.baseURL}${exam.originalImgURL}`;
			exam.processedImgURL = `${process.env.baseURL}${exam.processedImgURL}`;
		}
		return exam;
	}
}