import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
export class GetExamService {

	constructor(private examsRepository: IExamsRepository) { }

	async execute(id: string) {
		const exam = await this.examsRepository.findById(id);
		if (exam) {
			return {
				...exam,
				dicomFileURL: `${process.env.baseURL}/public/${exam.dicomFileURL}`,
				originalImgURL: `${process.env.baseURL}/public/${exam.originalImgURL}`,
				processedImgURL: `${process.env.baseURL}/public/${exam.processedImgURL}`
			};
		}
		return undefined;
	}
}