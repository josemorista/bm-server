import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IPatientsRepository } from '../../../patients/repositories/PatientsRepository/models/IPatientsRepository';
import { IDecisionTreeClassifierProvider } from '../../providers/DecisionTreeClassifierProvider/models/IDecisionTreeClassifierProvider';
import { IExamsDetectionsClassificationsRepository } from '../../repositories/ExamsDetectionsClassificationsRepository/models/IExamsDetectionsClassificationsRepository';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';

interface IClassifyDetectionsServiceDTO {
	examId: string;
	method: 'dt' | 'knn' | 'mlp' | 'svm';
}

@injectable()
export class ClassifyDetectionsService {

	constructor(
		@inject('ExamsDetections')
		private examsRepository: IExamsRepository,
		@inject('ExamsDetectionsRepository')
		private examsDetectionsRepository: IExamsDetectionsRepository,
		@inject('ExamsDetectionsClassificationsRepository')
		private examsDetectionsClassificationsRepository: IExamsDetectionsClassificationsRepository,
		@inject('PatientsRepository')
		private patientsRepository: IPatientsRepository,
		@inject('DecisionTreeClassifierProvider')
		private decisionTreeClassifierProvider: IDecisionTreeClassifierProvider
	) {
	}

	async execute({ examId, method }: IClassifyDetectionsServiceDTO): Promise<Record<string, string>> {

		const exam = await this.examsRepository.findById(examId);

		if (!exam.patient || !exam.examDetections) {
			throw new AppError('patient or detections not load with exam');
		}

		//const examsDetections = await this.examsDetectionsRepository.findByExamId(examId);

		const examDetectionsClassifications: Record<string, string> = {};

		const targetValues = (await this.examsDetectionsClassificationsRepository.findAll()).map(label => label.id);

		await Promise.all(exam.examDetections.map(async (detection) => {

			if (!exam.patient) {
				throw new AppError('missing patient from exam');
			}

			const result = await this.decisionTreeClassifierProvider.classify({
				attributes: {
					...detection,
					previousBoneLesions: exam.patient.previousBoneLesions,
					previousCancerDiagnosis: exam.patient.previousCancerDiagnosis,
					previousQt: exam.patient.previousQt,
					previousRt: exam.patient.previousRt
				},
				targetValues
			});

			examDetectionsClassifications[detection.id] = result;

			await this.examsDetectionsRepository.updateAutomaticClassificationId({
				id: detection.id,
				automaticClassificationId: result
			});
		}));

		return examDetectionsClassifications;
	}

}