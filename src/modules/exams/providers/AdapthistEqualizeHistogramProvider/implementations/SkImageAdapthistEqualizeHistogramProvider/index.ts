
import path from 'path';
import { spawnSync } from 'child_process';
import { IAdapthistEqualizeHistogramProvider, IApplyAdapthistEqualizationDTO } from '../../models/IAdapthistEqualizeHistogramProvider';

export class SkImageAdapthistEqualizeHistogramProvider implements IAdapthistEqualizeHistogramProvider {
	async applyAdapthistHistogramEqualization({ imgPath, outImgPath }: IApplyAdapthistEqualizationDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'applyAdapthistEqualizeHistogram.py'),
			imgPath,
			outImgPath
		]);
	}
}