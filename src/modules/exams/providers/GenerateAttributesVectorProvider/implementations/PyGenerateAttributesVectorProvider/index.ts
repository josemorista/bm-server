
import path from 'path';
import { spawnSync } from 'child_process';
import { IGenerateAttributeVectorResponseDTO, IGenerateAttributesVectorDTO, IGenerateAttributesVectorProvider } from '../../models';

export class PyGenerateAttributesVectorProvider implements IGenerateAttributesVectorProvider {
	async generate({ dcmPath, outDirectoryPath }: IGenerateAttributesVectorDTO): Promise<IGenerateAttributeVectorResponseDTO> {
		const process = spawnSync('python3', [
			path.resolve(__dirname, 'generate.py'),
			dcmPath,
			outDirectoryPath
		]);
		return JSON.parse(process.stdout.toString());
	}
}