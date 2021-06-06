import { IRandomForestApplyModelDTO, IRandomForestSegmentationProvider, IRandomForestSegmentationProviderResponseDTO } from '../../models/IRandomForestSegmentationProvider';
import path from 'path';
import { spawnSync } from 'child_process';

export class PyRandomForestSegmentationProvider implements IRandomForestSegmentationProvider {
	async applyModel({ csvPath, outDirectoryPath, proba, shape }: IRandomForestApplyModelDTO): Promise<IRandomForestSegmentationProviderResponseDTO> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'applyModel.py'),
			csvPath,
			outDirectoryPath,
			String(proba),
			path.resolve(__dirname, 'rfModel.model'),
			String(shape[0]),
			String(shape[1])
		]);
		return JSON.parse(process.stdout.toString());
	}
}