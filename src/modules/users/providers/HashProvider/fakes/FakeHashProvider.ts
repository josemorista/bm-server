import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {

	async hash(data: string): Promise<string> {
		return data;
	}

	async compare(data: string, hashed: string): Promise<boolean> {
		return data === hashed;
	}
}