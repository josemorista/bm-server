import { IExamDetection } from '../../../entities/models/IExamDetection';

export type ICreateExamDetectionDTO = Omit<IExamDetection, 'id' | 'createdAt' | 'updatedAt'>;

export interface IExamsDetectionsRepository {
	create(data: ICreateExamDetectionDTO): Promise<IExamDetection>;
}