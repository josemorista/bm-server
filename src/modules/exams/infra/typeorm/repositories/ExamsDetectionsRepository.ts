import { getRepository, Repository } from 'typeorm';
import { IExamDetection } from '../../../entities/models/IExamDetection';
import { ICreateExamDetectionDTO, IExamsDetectionsRepository } from '../../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { ExamDetection } from '../entities/ExamDetection';

export class ExamsDetectionsRepository implements IExamsDetectionsRepository {
	private ormRepository: Repository<ExamDetection>;

	constructor() {
		this.ormRepository = getRepository(ExamDetection);
	}

	async create(data: ICreateExamDetectionDTO): Promise<IExamDetection> {
		const examDetection = await this.ormRepository.create(data);
		await this.ormRepository.save(examDetection);
		return examDetection;
	}

	async deleteByExamId(examId: string): Promise<void> {
		await this.ormRepository.delete({
			examId
		});
	}

	async deleteById(id: string): Promise<void> {
		await this.ormRepository.delete({
			id
		});
	}
}