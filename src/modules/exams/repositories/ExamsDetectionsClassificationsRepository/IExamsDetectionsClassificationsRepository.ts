import { IExamDetectionClassification } from '../../entities/models/IExamDetectionClassification';

export interface IExamsDetectionsClassificationsRepository {
	findAll(): Promise<Array<IExamDetectionClassification>>;
}