import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IPatientsRepository } from '../../repositories/PatientsRepository/models/IPatientsRepository';

interface IDeletePatientServiceDTO {
	requestUserId: string;
	patientId: string;
}

@injectable()
export class DeletePatientService {

	constructor(
		@inject('PatientsRepository')
		private patientsRepository: IPatientsRepository) { }

	async execute({ patientId, requestUserId }: IDeletePatientServiceDTO): Promise<void> {
		const patient = await this.patientsRepository.findById(patientId);
		if (!patient) {
			throw new AppError('Patient not found', 404);
		}
		if (patient.ownerId !== requestUserId) {
			throw new AppError('Forbidden user', 401);
		}

		await this.patientsRepository.deleteById(patientId);
	}
}