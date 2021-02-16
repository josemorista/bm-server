import { IPatient } from '../../../entities/models/IPatient';

export type ICreatePatientDTO = Omit<IPatient, 'createdAt' | 'updatedAt'>;

export interface IFindByNameAndOwnerDTO {
	name: string;
	ownerId: string
}
export interface IPatientsRepository {
	create(data: ICreatePatientDTO): Promise<IPatient>;
	updatePatientById(id: string, data: Partial<IPatient>): Promise<void>;
	findById(id: string): Promise<IPatient>;
	findByOwner(ownerId: string): Promise<Array<IPatient>>;
	findByNameAndOwner(data: IFindByNameAndOwnerDTO): Promise<IPatient | undefined>;
}