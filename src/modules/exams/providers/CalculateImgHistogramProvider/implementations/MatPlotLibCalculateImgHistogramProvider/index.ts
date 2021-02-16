
import path from 'path';
import { spawnSync } from 'child_process';
import { ICalculateImgHistogramDTO, ICalculateImgHistogramProvider } from '../../models/ICalculateImgHistogramProvider';

export class MatPlotLibCalculateImgHistogramProvider implements ICalculateImgHistogramProvider {
	async calculateImgHistogram({ imgPath, outImgPath, bins, range }: ICalculateImgHistogramDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'calculateImgHistogram.py'),
			imgPath,
			outImgPath,
			String(bins),
			String(range[0]),
			String(range[1]),
		]);
	}
}