import { IRandomForestApplyModelDTO, IRandomForestSegmentationProvider, IRandomForestSegmentationProviderResponseDTO } from '../../models/IRandomForestSegmentationProvider';
import path from 'path';
import { spawnSync } from 'child_process';

export class PyRandomForestSegmentationProvider implements IRandomForestSegmentationProvider {
	async applyModel({ dcmPath, outDirectoryPath, proba }: IRandomForestApplyModelDTO): Promise<IRandomForestSegmentationProviderResponseDTO> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'applyModel.py'),
			dcmPath,
			outDirectoryPath,
			String(proba),
			path.resolve(__dirname, 'rfModel')
		]);
		return JSON.parse(process.stdout.toString());
	}
}