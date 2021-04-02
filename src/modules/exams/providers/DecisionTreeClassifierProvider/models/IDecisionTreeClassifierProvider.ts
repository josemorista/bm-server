import { IPatient } from '../../../../patients/entities/models/IPatient';
import { IExamDetection } from '../../../entities/models/IExamDetection';

export interface IDTClassifyDTO {
	attributes: Pick<IExamDetection,
		'area' | 'aspectRatio' | 'centroidX'
		| 'centroidY' | 'eccentricity' | 'equivalentDiameter'
		| 'meanIntensity' | 'perimeter' | 'orientation' | 'extent'> &
	Pick<IPatient, 'previousBoneLesions' | 'previousCancerDiagnosis' | 'previousQt' | 'previousRt'>
}

export interface IDecisionTreeClassifierProvider {
	classify(data: IDTClassifyDTO): Promise<string>;
}