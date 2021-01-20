import { IUser } from '../../../users/entities/models/IUser';

export interface IPatient {
	id: string;
	name: string;
	age: number;
	sex: 'male' | 'female';
	history: string;
	ownerId: string;
	owner?: IUser;
	createdAt: Date;
	updatedAt: Date;
}