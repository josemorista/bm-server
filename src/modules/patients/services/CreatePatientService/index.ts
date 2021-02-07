import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IPatient } from '../../entities/models/IPatient';
import { IPatientsRepository } from '../../repositories/PatientsRepository/models/IPatientsRepository';
import { v4 as uuid } from 'uuid';

type ICreatePatientServiceDTO = Omit<IPatient, 'createdAt' | 'updatedAt' | 'id'>;

@injectable()
export class CreatePatientService {

	constructor(
		@inject('PatientsRepository')
		private patientsRepository: IPatientsRepository
	) { }

	async execute({ name, ownerId, ...rest }: ICreatePatientServiceDTO): Promise<IPatient> {
		const hasPatient = await this.patientsRepository.findByNameAndOwner({ name, ownerId });
		if (hasPatient) {
			throw new AppError('Patient already exists!');
		}
		const patient = await this.patientsRepository.create({ id: uuid(), name, ownerId, ...rest });
		return patient;
	}
}