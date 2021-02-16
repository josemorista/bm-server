import { getRepository, Repository } from 'typeorm';
import { IExamDetectionClassification } from '../../../entities/models/IExamDetectionClassification';
import { IExamsDetectionsClassificationsRepository } from '../../../repositories/ExamsDetectionsClassificationsRepository/IExamsDetectionsClassificationsRepository';
import { ExamDetectionClassification } from '../entities/ExamDetectionClassification';

export class ExamsDetectionsClassificationsRepository implements IExamsDetectionsClassificationsRepository {
	private ormRepository: Repository<ExamDetectionClassification>;

	constructor() {
		this.ormRepository = getRepository(ExamDetectionClassification);
	}

	async findAll(): Promise<Array<IExamDetectionClassification>> {
		return await this.ormRepository.find();
	}
}