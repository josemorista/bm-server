
import path from 'path';
import { spawnSync } from 'child_process';
import { IApplyRobertsDTO, IRobertsEdgeFilterProvider } from '../../models/IRobertsEdgeFilterProvider';

export class SkimageRobertsEdgeFilterProvider implements IRobertsEdgeFilterProvider {
	async applyRoberts({ imgPath, outImgPath }: IApplyRobertsDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'applyRobertsEdgeFilter.py'),
			imgPath,
			outImgPath
		]);
	}
}