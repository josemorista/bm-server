
import path from 'path';
import { spawnSync } from 'child_process';
import { IApplyLocalOtsuSegmentationDTO, ILocalOtsuSegmentationProvider } from '../../models/ILocalOtsuSegmentationProvider';

export class SkimageLocalOtsuSegmentationProvider implements ILocalOtsuSegmentationProvider {
	async applyLocalOtsuSegmentation({ imgPath, outImgPath, diskSize }: IApplyLocalOtsuSegmentationDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'applyLocalOtsuSegmentation.py'),
			imgPath,
			outImgPath,
			String(diskSize)
		]);
	}
}