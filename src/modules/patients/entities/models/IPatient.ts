import { IUser } from '../../../users/entities/models/IUser';

export interface IPatient {
	id: string;
	name: string;
	birthDate: Date | null;
	sex: 'M' | 'F';
	previousBoneLesions: boolean;
	previousQt: boolean | null;
	previousRt: boolean | null;
	previousCancerDiagnosis: boolean;
	previousCancerDiagnosisType?: string;
	observations: string;
	ownerId: string;
	owner?: IUser;
	createdAt: Date;
	updatedAt: Date;
}