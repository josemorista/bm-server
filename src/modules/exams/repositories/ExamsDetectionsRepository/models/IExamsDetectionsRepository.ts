import { IExamDetection } from '../../../entities/models/IExamDetection';

export type ICreateExamDetectionDTO = Omit<IExamDetection, 'createdAt' | 'updatedAt'>;

export interface IUpdateAutomaticClassificationDTO {
	id: string;
	automaticClassificationId: IExamDetection['automaticClassificationId'];
}

export interface IUpdateRevisedClassificationDTO {
	id: string;
	revisedClassificationId: IExamDetection['revisedClassificationId'];
}
export interface IExamsDetectionsRepository {
	create(data: ICreateExamDetectionDTO): Promise<IExamDetection>;
	deleteByExamId(examId: string): Promise<void>;
	findByExamId(examId: string): Promise<Array<IExamDetection>>;
	updateAutomaticClassificationId(data: IUpdateAutomaticClassificationDTO): Promise<void>;
	updateRevisedClassificationId(data: IUpdateRevisedClassificationDTO): Promise<void>;
	deleteById(id: string): Promise<void>;
}