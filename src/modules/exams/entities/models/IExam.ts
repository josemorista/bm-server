import { IPatient } from '../../../patients/entities/models/IPatient';

export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';

	date: Date | string;

	patientId: string;
	patient?: IPatient;

	pixelArea: number;

	dicomFileLocation: string;

	createdAt: Date | string;
	updatedAt: Date | string;
}