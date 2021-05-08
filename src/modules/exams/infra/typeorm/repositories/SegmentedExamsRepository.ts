import { getRepository, Repository } from 'typeorm';
import { IFindByExamIdAndAlgorithmDTO, ISegmentedExamsRepository } from '../../../repositories/SegmentedExamsRepository/models/ISegmentedExamsRepository';
import { SegmentedExam } from '../entities/SegmentedExam';


export class SegmentedExamsRepository implements ISegmentedExamsRepository {

	private ormRepository: Repository<SegmentedExam>;

	constructor() {
		this.ormRepository = getRepository(SegmentedExam);
	}

	findByExamIdAndAlgorithm(data: IFindByExamIdAndAlgorithmDTO): Promise<undefined | SegmentedExam> {
		return this.ormRepository.findOne({
			where: data
		});
	}

}