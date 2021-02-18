import { IPatient } from '../../../patients/entities/models/IPatient';

export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';
	patientId: string;
	patient?: IPatient;
	maxDicomValue: number;
	currentStep: number;
	denoiseFilter: 'median' | null;
	histogramEqualization: 'adapthist' | null;
	edgeFilter: 'roberts' | 'sobel' | 'prewitt' | 'scharr' | null;
	segmentationMethod: 'otsu' | 'randomWalker' | null;
	denoisedImgLocation: string | null;
	equalizedImgLocation: string | null;
	segmentedImgLocation: string | null;
	edgedImgLocation: string | null;
	originalImgLocation: string | null;
	originalImgHistogramLocation: string | null;
	equalizedImgHistogramLocation: string | null;
	dicomFileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}