import { IUser } from '../../../users/entities/models/IUser';

export interface IPatient {
	id: string;
	name: string;
	birthDate: Date;
	sex: 'male' | 'female';
	history: string;
	ownerId: string;
	owner?: IUser;
	createdAt: Date;
	updatedAt: Date;
}