import { IExamsRepository } from '../models/IExamsRepository';
import { v4 as uuid } from 'uuid';

const exams: Array<IExam> = [];

export class MemExamsRepository implements IExamsRepository {

	async create(data: Omit<IExam, 'id'>): Promise<IExam> {
		const exam = {
			id: uuid(),
			...data
		};
		exams.push(exam);
		return exam;
	}

	async findById(id: string): Promise<IExam | undefined> {
		return exams.find(el => el.id === id);
	}
}