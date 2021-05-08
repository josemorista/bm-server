import { ISegmentedExam } from '../../../entities/models/ISegmentedExam';

export type IFindByExamIdAndAlgorithmDTO = Pick<ISegmentedExam, 'algorithm' | 'examId'>;

export interface ISegmentedExamsRepository {
	findByExamIdAndAlgorithm(data: IFindByExamIdAndAlgorithmDTO): Promise<ISegmentedExam | undefined>;
}