
import path from 'path';
import { spawnSync } from 'child_process';
import { IExtractRegionsFeaturesDTO, IExtractRegionsFeaturesProvider, IExtractRegionsFeaturesReturnDTO } from '../../models/IExtractRegionsFeaturesProvider';

export class SkimageExtractRegionsFeaturesProvider implements IExtractRegionsFeaturesProvider {
	async extractRegionsFeatures({ imgPath, equalizedImgPath }: IExtractRegionsFeaturesDTO): Promise<Array<IExtractRegionsFeaturesReturnDTO>> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'extractRegionsFeatures.py'),
			imgPath,
			equalizedImgPath
		]);
		const response = JSON.parse(process.output[1].toString());
		return response;
	}
}