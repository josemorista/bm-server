
import path from 'path';
import { spawnSync } from 'child_process';
import { INaiveBayesApplyModelDTO, INaiveBayesProviderResponseDTO, INaiveBayesSegmentationProvider } from '../../models/INaiveBayesSegmentationProvider';

export class PyNaiveBayesSegmentationProvider implements INaiveBayesSegmentationProvider {
	async applyModel({ csvPath, outDirectoryPath, proba, shape }: INaiveBayesApplyModelDTO): Promise<INaiveBayesProviderResponseDTO> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'applyModel.py'),
			csvPath,
			outDirectoryPath,
			String(proba),
			path.resolve(__dirname, 'naive.model'),
			String(shape[0]),
			String(shape[1])
		]);
		return JSON.parse(process.stdout.toString());
	}
}