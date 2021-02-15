
import path from 'path';
import { spawnSync } from 'child_process';
import { IApplyOtsuSegmentationDTO, IOtsuSegmentationProvider } from '../../models/IOtsuSegmentationProvider';

export class SkimageOtsuSegmentationProvider implements IOtsuSegmentationProvider {
	async applyOtsuSegmentation({ imgPath, outImgPath }: IApplyOtsuSegmentationDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'applyOtsuSegmentation.py'),
			imgPath,
			outImgPath
		]);
	}
}