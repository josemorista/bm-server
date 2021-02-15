
import path from 'path';
import { spawnSync } from 'child_process';
import { IApplySobelDTO, ISobelEdgeFilterProvider } from '../../models/ISobelEdgeFilterProvider';

export class SkimageSobelEdgeFilterProvider implements ISobelEdgeFilterProvider {
	async applySobel({ imgPath, outImgPath }: IApplySobelDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'applySobelEdgeFilter.py'),
			imgPath,
			outImgPath
		]);
	}
}