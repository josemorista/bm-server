
import path from 'path';
import { spawnSync } from 'child_process';
import { IDecisionTreeClassifierProvider, IDTClassifyDTO } from '../../models/IDecisionTreeClassifierProvider';
import { AppError } from '../../../../../../shared/errors/AppError';

export class SkLearnDecisionTreeClassifierProvider implements IDecisionTreeClassifierProvider {

	async classify({ attributes }: IDTClassifyDTO): Promise<string> {
		console.log(JSON.stringify(attributes));
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'applyDT.py'),
			path.resolve(__dirname, 'dt.sav'),
			JSON.stringify(attributes)
		]);
		const response = Number(process.stdout.toString());
		if (response === 1) return '8eb39b0d-4c10-4b1f-9083-c8f48666a48c';
		if (response === 0) return 'e3b044b1-c1db-4d71-9c08-a9c760730fd5';
		throw new AppError('invalid response');
	}
}