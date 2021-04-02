import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDecisionTreeClassifierProvider } from '../../providers/DecisionTreeClassifierProvider/models/IDecisionTreeClassifierProvider';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';

interface IClassifyDetectionsServiceDTO {
	examId: string;
	method: 'dt' | 'knn' | 'mlp' | 'svm';
}

@injectable()
export class ClassifyDetectionsService {

	constructor(
		@inject('ExamsRepository')
		private examsRepository: IExamsRepository,
		@inject('ExamsDetectionsRepository')
		private examsDetectionsRepository: IExamsDetectionsRepository,
		@inject('DecisionTreeClassifierProvider')
		private decisionTreeClassifierProvider: IDecisionTreeClassifierProvider
	) {
	}

	async execute({ examId, method }: IClassifyDetectionsServiceDTO): Promise<Record<string, string>> {

		const exam = await this.examsRepository.findById(examId);

		if (!exam.patient || !exam.examDetections) {
			throw new AppError('patient or detections not load with exam');
		}

		const examDetectionsClassifications: Record<string, string> = {};

		await Promise.all(exam.examDetections.map(async (detection) => {

			if (!exam.patient) {
				throw new AppError('missing patient from exam');
			}

			const result = await this.decisionTreeClassifierProvider.classify({
				attributes: {
					area: detection.area,
					perimeter: detection.perimeter,
					aspectRatio: detection.aspectRatio,
					centroidX: detection.centroidX,
					centroidY: detection.centroidY,
					equivalentDiameter: detection.equivalentDiameter,
					extent: detection.extent,
					meanIntensity: detection.meanIntensity,
					orientation: detection.orientation,
					eccentricity: detection.eccentricity,
					previousBoneLesions: exam.patient.previousBoneLesions,
					previousCancerDiagnosis: exam.patient.previousCancerDiagnosis,
					previousQt: exam.patient.previousQt,
					previousRt: exam.patient.previousRt
				}
			});

			examDetectionsClassifications[detection.id] = result;

			await this.examsDetectionsRepository.updateAutomaticClassificationId({
				id: detection.id,
				automaticClassificationId: result
			});
		}));

		await this.examsRepository.updateById(exam.id, {
			currentStep: 'classify'
		});

		return examDetectionsClassifications;
	}

}