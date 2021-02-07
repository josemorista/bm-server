import { IPatient } from '../../../patients/entities/models/IPatient';

export interface IExam {
	id: string;
	label: string;
	patientId: string;
	patient?: IPatient;
	maxDicomValue: number;
	currentStep: number;
	denoiseFilter: 'median' | null;
	histogramEqualization: 'adaptative' | null;
	edgeFilter: 'roberts' | 'sobel' | 'prewitt' | 'scharr' | null;
	segmentationMethod: 'otsu' | 'randomWalker' | null;
	processedImgLocation: string;
	originalImgLocation: string;
	dicomFileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}