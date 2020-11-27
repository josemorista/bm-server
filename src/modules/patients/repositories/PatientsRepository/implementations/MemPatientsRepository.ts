import { IPatientsRepository } from '../models/IPatientsRepository';
import { v4 as uuid } from 'uuid';
import { IPatient } from '../../../entities/models/IPatient';

const patients: Array<IPatient> = [];

export class MemPatientsRepository implements IPatientsRepository {

	async create(data: Omit<IPatient, 'id'>): Promise<IPatient> {
		const patient = {
			id: uuid(),
			...data
		};
		patients.push(patient);
		return patient;
	}

	async findById(id: string): Promise<IPatient | undefined> {
		return patients.find(el => el.id === id);
	}

	async findByOwner(ownerId: string): Promise<Array<IPatient>> {
		return patients.filter(el => el.ownerId === ownerId);
	}
}