import { ISegmentedExam } from '../../../entities/models/ISegmentedExam';

export type IFindByExamIdAndAlgorithmDTO = Pick<ISegmentedExam, 'algorithm' | 'examId'>;

export type ICreateSegmentedExamDTO = Omit<ISegmentedExam, 'createdAt' | 'updatedAt'>;

export interface ISegmentedExamsRepository {
	findByExamIdAndAlgorithm(data: IFindByExamIdAndAlgorithmDTO): Promise<ISegmentedExam | undefined>;
	deleteByExamId(examId: string): Promise<void>;
	create(data: ICreateSegmentedExamDTO): Promise<ISegmentedExam>;
}