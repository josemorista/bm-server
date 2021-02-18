
import path from 'path';
import { spawnSync } from 'child_process';
import { IRandomWalkerSegmentationProvider, IApplyRandomWalkerDTO } from '../../models/IRandomWalkerSegmentationProvider';

export class SkimageRandomWalkerSegmentationProvider implements IRandomWalkerSegmentationProvider {
	async applyRandomWalker({ imgPath, outImgPath, markers, beta }: IApplyRandomWalkerDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'applyRandomWalkerSegmentation.py'),
			imgPath,
			outImgPath,
			String(markers[0]),
			String(markers[1]),
			String(beta)
		]);
	}
}