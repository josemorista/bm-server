
import path from 'path';
import { spawnSync } from 'child_process';
import { IMlpApplyModelDTO, IMlpProviderResponseDTO, IMlpSegmentationProvider } from '../../models/IMlpSegmentationProvider';

export class PyMlpSegmentationProvider implements IMlpSegmentationProvider {
	async applyModel({ csvPath, outDirectoryPath, proba, shape }: IMlpApplyModelDTO): Promise<IMlpProviderResponseDTO> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'applyModel.py'),
			csvPath,
			outDirectoryPath,
			String(proba),
			path.resolve(__dirname, 'mlp.model'),
			String(shape[0]),
			String(shape[1])
		]);
		return JSON.parse(process.stdout.toString());
	}
}