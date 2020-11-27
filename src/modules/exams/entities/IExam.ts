export interface IExam {
	id: string;
	name: string;
	patientId: string;
	minDicomValue: number;
	maxDicomValue: number;
	currentStep: number;
	segmentationParams: Array<number>;
	filteringOperations: Array<string>;
	processedImgURL: string;
	originalImgURL: string;
	dicomFileURL: string;
}