import { inject, injectable } from 'tsyringe';
import { IDecisionTreeClassifierProvider } from '../../providers/DecisionTreeClassifierProvider/models/IDecisionTreeClassifierProvider';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';

interface IClassifyDetectionsServiceDTO {
	examId: string;
	method: 'dt' | 'knn' | 'mlp' | 'svm';
}

@injectable()
export class ClassifyDetectionsService {

	constructor(
		@inject('ExamsDetectionsRepository')
		private examsDetectionsRepository: IExamsDetectionsRepository,
		@inject('DecisionTreeClassifierProvider')
		private decisionTreeClassifierProvider: IDecisionTreeClassifierProvider

	) {
	}

	async execute({ examId, method }: IClassifyDetectionsServiceDTO): Promise<Record<string, string>> {
		const examsDetections = await this.examsDetectionsRepository.findByExamId(examId);

		const examDetectionsClassifications: Record<string, string> = {};

		await Promise.all(examsDetections.map(async (detection) => {

			const result = await this.decisionTreeClassifierProvider.classify({
				attributes: {
					...detection,
					previousBoneLesions: null,
					previousCancerDiagnosis: null,
					previousQt: null,
					previousRt: null
				}
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