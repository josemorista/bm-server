import { IPatient } from '../../../patients/entities/models/IPatient';
import { IExamDetection } from './IExamDetection';

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
	examDetections?: Array<IExamDetection>;
	createdAt: Date;
	updatedAt: Date;
}