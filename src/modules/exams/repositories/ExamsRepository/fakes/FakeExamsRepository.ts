import { ICreateExamDTO, IExamsRepository } from '../models/IExamsRepository';
import { IExam } from '../../../entities/models/IExam';
import { AppError } from '../../../../../shared/errors/AppError';


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

	async findById(id: string): Promise<IExam> {
		const exam = this.exams.find(el => el.id === id);
		if (!exam) {
			throw new AppError('Exam not found');
		}
		return exam;
	}

	async findByPatient(patientId: string): Promise<Array<IExam>> {
		return this.exams.filter(el => el.patientId === patientId);
	}

	async updateById(id: string, data: IExam): Promise<void> {
		const index = this.exams.findIndex(el => el.id === id);
		if (index === -1) {
			throw new AppError('exam does not exists');
		}
		this.exams = this.exams.filter(el => el.id !== id);
		this.exams.push({
			...data,
			id
		});
	}
}