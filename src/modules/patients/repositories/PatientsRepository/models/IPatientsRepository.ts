import { IPatient } from '../../../entities/models/IPatient';

export interface IPatientsRepository {
	create(data: Omit<IPatient, 'id'>): Promise<IPatient>;
	findById(id: string): Promise<IPatient | undefined>;
}