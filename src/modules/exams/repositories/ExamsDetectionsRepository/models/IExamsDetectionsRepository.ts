import { IExamDetection } from '../../../entities/models/IExamDetection';

export type ICreateExamDetectionDTO = Omit<IExamDetection, 'createdAt' | 'updatedAt'>;

export interface IExamsDetectionsRepository {
	create(data: ICreateExamDetectionDTO): Promise<IExamDetection>;
	deleteByExamId(examId: string): Promise<void>;
	deleteById(id: string): Promise<void>;
}