import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { spawnSync } from 'child_process';
import path from 'path';
import { uploadConfig } from '../../../../config/upload';

interface ISegmentExamServiceDTO {
	id: string;
	min: number;
	max: number;
}

export class SegmentExamService {

	constructor(private examsRepository: IExamsRepository) { }

	async execute({ id, min, max }: ISegmentExamServiceDTO): Promise<void> {
		const exam = await this.examsRepository.findById(id);
		if (exam) {
			spawnSync('python3', [
				path.resolve(__dirname, 'dicomParser.py'),
				path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFile),
				String(min),
				String(max),
				path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.processedImg || `pro-${exam.dicomFile.replace('.dcm', '.png')}`)
			]);

			if (!exam.originalImg) {
				spawnSync('python3', [
					path.resolve(__dirname, 'dicomParser.py'),
					path.resolve(uploadConfig.diskStorageProviderConfig.destination, exam.dicomFile),
					String(0),
					String(300),
					path.resolve(uploadConfig.diskStorageProviderConfig.destination, `org-${exam.dicomFile.replace('.dcm', '.png')}`)
				]);
			}

			// update segmentation params

		}

	}
}