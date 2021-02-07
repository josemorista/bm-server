import { IUser } from '../../../users/entities/models/IUser';

export interface IPatient {
	id: string;
	name: string;
	birthDate: Date;
	sex: 'M' | 'F';
	previousBoneLesions: boolean;
	previousQt: boolean;
	previousRt: boolean;
	previousCancerDiagnosis: boolean;
	previousCancerDiagnosisType?: string;
	observations: string;
	ownerId: string;
	owner?: IUser;
	createdAt: Date;
	updatedAt: Date;
}