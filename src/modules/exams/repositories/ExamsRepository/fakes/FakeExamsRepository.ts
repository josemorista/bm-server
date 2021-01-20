import { ICreateExamDTO, IExamsRepository } from '../models/IExamsRepository';
import { IExam } from '../../../entities/models/IExam';


export class FakeExamsRepository implements IExamsRepository {

	private exams: Array<IExam> = [];

	async create(data: ICreateExamDTO): Promise<IExam> {
		const exam = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date()
		};
		this.exams.push(exam);
		return exam;
	}

	async findById(id: string): Promise<IExam | undefined> {
		return this.exams.find(el => el.id === id);
	}

	async findByPatient(patientId: string): Promise<Array<IExam>> {
		return this.exams.filter(el => el.patientId === patientId);
	}
}