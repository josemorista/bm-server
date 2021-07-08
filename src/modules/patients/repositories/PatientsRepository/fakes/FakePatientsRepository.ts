import { IPatientsRepository, ICreatePatientDTO } from '../models/IPatientsRepository';
import { IPatient } from '../../../entities/models/IPatient';

export class FakePatientsRepository implements IPatientsRepository {

	patients: Array<IPatient>;

	constructor() {
		this.patients = [];
	}

	async create(data: ICreatePatientDTO): Promise<IPatient> {
		const patient = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date()
		};
		this.patients.push(patient);
		return patient;
	}

	async findById(id: string): Promise<IPatient | undefined> {
		return this.patients.find(el => el.id === id);
	}

	async findByOwner(ownerId: string): Promise<Array<IPatient>> {
		return this.patients.filter(el => el.ownerId === ownerId);
	}
}