import { IPatient } from '../../../patients/entities/models/IPatient';

export interface IExam {
	id: string;
	name: string;
	patientId: string;
	patient?: IPatient;
	minDicomValue: number | null;
	maxDicomValue: number | null;
	currentStep: number;
	segmentationParams: Array<number>;
	filteringOperations: Array<string>;
	processedImgURL: string | null;
	originalImgURL: string | null;
	dicomFileURL: string;
	createdAt: Date;
	updatedAt: Date;
}