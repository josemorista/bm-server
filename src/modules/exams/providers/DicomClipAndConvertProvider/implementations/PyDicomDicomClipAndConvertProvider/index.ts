import { IDicomClipAndConvertProvider, IDicomClipAndConvertToImgDTO } from '../../models/IDicomClipAndConvertProvider';
import path from 'path';
import { spawnSync } from 'child_process';

export class PyDicomDicomClipAndConvertProvider implements IDicomClipAndConvertProvider {
	async clipAndConvertToImg({ filePath, outFilePath, maxDicomValue }: IDicomClipAndConvertToImgDTO): Promise<void> {
		spawnSync('python3', [
			path.resolve(__dirname, 'clipAndConvert.py'),
			filePath,
			outFilePath,
			String(maxDicomValue)
		]);
	}
}