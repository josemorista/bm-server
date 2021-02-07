import { IPatient } from '../../../patients/entities/models/IPatient';

export interface IExam {
	id: string;
	label: string;
	patientId: string;
	patient?: IPatient;
	maxDicomValue: number;
	currentStep: number;
	adaptiveHistogram: boolean;
	processedImgLocation: string | null;
	originalImgLocation: string | null;
	dicomFileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}