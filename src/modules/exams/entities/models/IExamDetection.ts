import { IExam } from './IExam';

export interface IExamDetection {
	id: string;
	examId: string;
	automaticClassificationId: string;
	revisedClassificationId: string;
	area: number;
	aspectRatio: number;
	centroidX: number;
	centroidY: number;
	equivalentDiameter: number;
	extent: number;
	maxIntensity: number;
	meanIntensity: number;
	minIntensity: number;
	orientation: number;
	eccentricity: number;
	rt: number | null;
	qt: number | null;
	sex: 'M' | 'F';
	exam?: IExam;
	createdAt: Date;
	updatedAt: Date;
}