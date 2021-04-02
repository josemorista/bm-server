
import path from 'path';
import { spawnSync } from 'child_process';
import { IExtractRegionsFeaturesDTO, IExtractRegionsFeaturesProvider, IExtractRegionsFeaturesReturnDTO } from '../../models/IExtractRegionsFeaturesProvider';

export class SkimageExtractRegionsFeaturesProvider implements IExtractRegionsFeaturesProvider {
	async extractRegionsFeatures({ imgPath, originalImgPath, outImgPath }: IExtractRegionsFeaturesDTO): Promise<Array<IExtractRegionsFeaturesReturnDTO>> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'extractRegionsFeatures.py'),
			imgPath,
			originalImgPath,
			outImgPath
		]);
		const response = JSON.parse(process.stdout.toString());
		return response;
	}
}