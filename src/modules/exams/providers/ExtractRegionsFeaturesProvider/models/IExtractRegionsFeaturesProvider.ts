import { IExamDetection } from '../../../entities/models/IExamDetection';

export interface IExtractRegionsFeaturesDTO {
	imgPath: string;
	equalizedImgPath: string;
}

export type IExtractRegionsFeaturesReturnDTO = Omit<IExamDetection,
	'createdAt'
	| 'id'
	| 'updatedAt'
	| 'examId'
	| 'automaticClassificationId'
	| 'revisedClassificationId'
	| 'sex'
	| 'qt'
	| 'rt'>;

export interface IExtractRegionsFeaturesProvider {
	extractRegionsFeatures(data: IExtractRegionsFeaturesDTO): Promise<Array<IExtractRegionsFeaturesReturnDTO>>;
}