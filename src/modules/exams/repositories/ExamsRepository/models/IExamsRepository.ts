import { IExam } from '../../../entities/models/IExam';

export interface IExamsRepository {
	create(data: Omit<IExam, 'id'>): Promise<IExam>;
	findById(id: string): Promise<IExam | undefined>;
	findByPatient(patientId: string): Promise<Array<IExam>>;
}