
import path from 'path';
import { spawnSync } from 'child_process';
import { IGenerateOverlayImageProvider, IGenerateOverlayImageDTO } from '../../models/IGenerateOverlayImageProvider';

export class SkimageGenerateOverlayImageProvider implements IGenerateOverlayImageProvider {

	async apply({ originalImagePath, resultImagePath, outDirPath }: IGenerateOverlayImageDTO): Promise<string> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'apply.py'),
			originalImagePath,
			resultImagePath,
			outDirPath
		]);
		return process.stdout.toString();
	}

}