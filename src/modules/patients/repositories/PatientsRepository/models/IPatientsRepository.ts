import { IPatient } from '../../../entities/models/IPatient';

export type ICreatePatientDTO = Omit<IPatient, 'createdAt' | 'updatedAt'>;

export interface IFindByNameAndOwnerDTO {
	name: string;
	ownerId: string
}
export interface IPatientsRepository {
	create(data: ICreatePatientDTO): Promise<IPatient>;
	findById(id: string): Promise<IPatient | undefined>;
	findByOwner(ownerId: string): Promise<Array<IPatient>>;
	findByNameAndOwner(data: IFindByNameAndOwnerDTO): Promise<IPatient | undefined>;
}