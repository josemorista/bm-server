import { inject, injectable } from 'tsyringe';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';

interface IClassifyDetectionServiceDTO {
	id: string;
	method: 'dt' | 'knn' | 'mlp' | 'svm';
}

@injectable()
export class ClassifyDetectionService {

	constructor(
		@inject('ExamsDetectionsRepository')
		private examsDetectionsRepository: IExamsDetectionsRepository
	) {

	}

}