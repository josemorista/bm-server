import { IExam } from '../../../entities/models/IExam';

export type ICreateExamDTO = Omit<IExam, 'createdAt' | 'updatedAt'>

export interface IExamsRepository {
	create(data: ICreateExamDTO): Promise<IExam>;
	findById(id: string): Promise<IExam | undefined>;
	findByPatient(patientId: string): Promise<Array<IExam>>;
	updateById(id: string, data: IExam): Promise<void>;
}