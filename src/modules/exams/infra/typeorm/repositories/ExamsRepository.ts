import { getRepository, Repository } from 'typeorm';
import { AppError } from '../../../../../shared/errors/AppError';
import { IExam } from '../../../entities/models/IExam';
import { ICreateExamDTO, IExamsRepository, IUpdateExamDTO } from '../../../repositories/ExamsRepository/models/IExamsRepository';
import { Exam } from '../entities/Exam';

export class ExamsRepository implements IExamsRepository {
	private ormRepository: Repository<Exam>;

	constructor() {
		this.ormRepository = getRepository(Exam);
	}

	async create(data: ICreateExamDTO): Promise<IExam> {
		const exam = await this.ormRepository.create(data);
		await this.ormRepository.save(exam);
		return exam;
	}

	async findById(id: string): Promise<IExam> {
		const exam = await this.ormRepository.findOne(id, {
			relations: [
				'patient',
				'examDetections',
				'examDetections.automaticClassification',
				'examDetections.revisedClassification'
			]
		});
		if (!exam) {
			throw new AppError('exam does not exits');
		}
		return exam;
	}

	async findByPatient(patientId: string): Promise<Array<IExam>> {
		return await this.ormRepository.find({
			where: {
				patientId
			}
		});
	}

	async updateById(id: string, data: IUpdateExamDTO): Promise<void> {
		const exam = await this.findById(id);
		await this.ormRepository.save({
			...exam,
			...data,
			id: exam.id
		});
	}
}