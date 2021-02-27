import { IPatient } from '../../../patients/entities/models/IPatient';

export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';
	patientId: string;
	patient?: IPatient;
	pixelArea: number;
	denoisedImgLocation: string | null;
	segmentedImgLocation: string | null;
	edgedImgLocation: string | null;
	originalImgLocation: string | null;
	resumeSegmentationImgLocation: string | null;
	dicomFileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}