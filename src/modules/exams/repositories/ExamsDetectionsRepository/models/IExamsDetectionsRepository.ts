import { IExamDetection } from '../../../entities/models/IExamDetection';

export type ICreateExamDetectionDTO = Omit<IExamDetection, 'createdAt' | 'updatedAt'>;

export interface IUpdateAutomaticClassificationDTO {
	id: string;
	automaticClassificationId: IExamDetection['automaticClassificationId'];
}
export interface IExamsDetectionsRepository {
	create(data: ICreateExamDetectionDTO): Promise<IExamDetection>;
	deleteByExamId(examId: string): Promise<void>;
	findByExamId(examId: string): Promise<Array<IExamDetection>>;
	updateAutomaticClassificationId(data: IUpdateAutomaticClassificationDTO): Promise<void>;
	deleteById(id: string): Promise<void>;
}