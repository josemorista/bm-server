
import path from 'path';
import { spawnSync } from 'child_process';
import { IGenerateOverlayImageProvider, IGenerateOverlayImageDTO } from '../../models/IGenerateOverlayImageProvider';

export class SkimageGenerateOverlayImageProvider implements IGenerateOverlayImageProvider {

	async apply({ originalImagePath, edgeImagePath, outDirPath }: IGenerateOverlayImageDTO): Promise<string> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'apply.py'),
			originalImagePath,
			edgeImagePath,
			outDirPath
		]);
		return process.stdout.toString();
	}

}