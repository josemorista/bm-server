import { IApplyMedianFilterDTO, IMedianDenoiseProvider } from '../../models/IMedianDenoiseProvider';
import path from 'path';
import { spawnSync } from 'child_process';

export class ScipyMedianDenoiseProvider implements IMedianDenoiseProvider {
	async applyMedianFilter({ imgPath, outImgPath, size }: IApplyMedianFilterDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'clipAndConvert.py'),
			imgPath,
			outImgPath,
			String(size)
		]);
	}
}