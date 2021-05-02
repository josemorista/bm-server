import { getRepository, Repository } from 'typeorm';
import { AppError } from '../../../../../shared/errors/AppError';
import { IPatient } from '../../../entities/models/IPatient';
import { ICreatePatientDTO, IFindByNameAndOwnerDTO, IPatientsRepository } from '../../../repositories/PatientsRepository/models/IPatientsRepository';
import { Patient } from '../entities/Patient';

export class PatientsRepository implements IPatientsRepository {

	private ormRepository: Repository<Patient>;

	constructor() {
		this.ormRepository = getRepository(Patient);
	}

	async create(data: ICreatePatientDTO): Promise<IPatient> {
		const patient = await this.ormRepository.create(data);
		await this.ormRepository.save(patient);
		return patient;
	}

	async findById(id: string): Promise<IPatient> {
		const patient = await this.ormRepository.findOne({
			where: { id },
			relations: ['owner']
		});
		if (!patient) {
			throw new AppError('Patient does not exists');
		}
		return patient;
	}

	async findByOwner(ownerId: string): Promise<Array<IPatient>> {
		return (await this.ormRepository.find({
			where: { ownerId }, order: {
				createdAt: 'DESC'
			}
		}));
	}

	async findByNameAndOwner({ name, ownerId }: IFindByNameAndOwnerDTO): Promise<IPatient | undefined> {
		return (await this.ormRepository.findOne({ where: { name, ownerId } }));
	}

	async updatePatientById(id: string, data: Partial<IPatient>): Promise<void> {
		const patient = await this.findById(id);
		await this.ormRepository.save({ ...data, id: patient.id });
	}
}