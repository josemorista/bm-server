import { getRepository, Repository } from 'typeorm';
import { ISegmentedExam } from '../../../entities/models/ISegmentedExam';
import { ICreateSegmentedExamDTO, IFindByExamIdAndAlgorithmDTO, ISegmentedExamsRepository } from '../../../repositories/SegmentedExamsRepository/models/ISegmentedExamsRepository';
import { SegmentedExam } from '../entities/SegmentedExam';


export class SegmentedExamsRepository implements ISegmentedExamsRepository {

	private ormRepository: Repository<SegmentedExam>;

	constructor() {
		this.ormRepository = getRepository(SegmentedExam);
	}

	async deleteByExamId(examId: string): Promise<void> {
		await this.ormRepository.delete({
			examId
		});
	}

	async create(data: ICreateSegmentedExamDTO): Promise<ISegmentedExam> {
		const segmentedExam = await this.ormRepository.create(data);
		await this.ormRepository.save(segmentedExam);
		return segmentedExam;
	}

	findByExamIdAndAlgorithm(data: IFindByExamIdAndAlgorithmDTO): Promise<undefined | SegmentedExam> {
		return this.ormRepository.findOne({
			where: data
		});
	}

}