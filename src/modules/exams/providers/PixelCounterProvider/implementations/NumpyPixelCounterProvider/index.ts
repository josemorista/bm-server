import { IPixelCounterProvider } from '../../models/IPixelCounterProvider';
import path from 'path';
import { spawnSync } from 'child_process';

export class NumpyPixelCounterProvider implements IPixelCounterProvider {

	async countNotNullPixels(imgPath: string): Promise<number> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'applyNotNullCounter.py'),
			imgPath
		]);
		return Number(process.stdout.toString());
	}

}