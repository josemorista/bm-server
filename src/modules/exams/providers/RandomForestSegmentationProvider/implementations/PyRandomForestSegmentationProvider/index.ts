import { IRandomForestApplyModelDTO, IRandomForestSegmentationProvider, IRandomForestSegmentationProviderResponseDTO } from '../../models/IRandomForestSegmentationProvider';
import path from 'path';
import { spawnSync } from 'child_process';

export class PyRandomForestSegmentationProvider implements IRandomForestSegmentationProvider {
	async applyModel({ csvPath, outDirectoryPath, proba, shape }: IRandomForestApplyModelDTO): Promise<IRandomForestSegmentationProviderResponseDTO> {
		console.time('ptime');
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'applyModel.py'),
			csvPath,
			outDirectoryPath,
			String(proba),
			path.resolve(__dirname, 'mlp100.model'),
			String(shape[0]),
			String(shape[1])
		]);
		console.timeEnd('ptime');
		return JSON.parse(process.stdout.toString());
	}
}