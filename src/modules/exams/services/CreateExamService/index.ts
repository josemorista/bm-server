import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { v4 as uuid } from 'uuid';
import { IExam } from '../../entities/models/IExam';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface ICreateExamServiceDTO {
	label: string;
	filename: string;
	patientId: string;
	category: IExam['category'];
	radioTracerApplicationHours: number;
	date: Date | string;
}

@injectable()
export class CreateExamService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) { }

	async execute({ filename, label, patientId, category, date, radioTracerApplicationHours }: ICreateExamServiceDTO): Promise<IExam> {
		const id = uuid();

		const dicomFileLocation = await this.storageProvider.save(filename, id);

		try {
			const exam = await this.examsRepository.create({
				id,
				label,
				category,
				patientId,
				dicomFileLocation,
				radioTracerApplicationHours,
				date
			});

			return exam;
		} catch (error) {
			this.storageProvider.remove(dicomFileLocation);
			throw error;
		}

	}
}