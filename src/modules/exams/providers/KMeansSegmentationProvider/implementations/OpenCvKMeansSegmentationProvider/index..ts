
import path from 'path';
import { spawnSync } from 'child_process';
import { IApplyKMeansSegmentationDTO, IKMeansSegmentationProvider } from '../../models/IKMeansSegmentationProvider';

export class OpenCvKMeansSegmentationProvider implements IKMeansSegmentationProvider {
	async applyKMeansSegmentation({ imgPath, outImgPath, clusters }: IApplyKMeansSegmentationDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'applyKMeans.py'),
			imgPath,
			outImgPath,
			String(clusters)
		]);
	}
}