import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { spawnSync } from 'child_process';
import path from 'path';
import { uploadsDirectory } from '../../../../config/upload';

interface ISegmentExamServiceDTO {
	id: string;
	min: number;
	max: number;
}

export class SegmentExamService {

	constructor(private examsRepository: IExamsRepository) { }

	async execute({ id, min, max }: ISegmentExamServiceDTO) {
		const exam = await this.examsRepository.findById(id);
		if (exam) {
			spawnSync('python3', [
				path.resolve(__dirname, 'dicomParser.py'),
				path.resolve(uploadsDirectory, exam.dicomFileURL),
				String(min),
				String(max),
				path.resolve(uploadsDirectory, exam.processedImgURL)
			]);
		}

	}
}