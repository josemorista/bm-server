import { hash, compare } from 'bcrypt';
import { IHashProvider } from '../models/IHashProvider';

export class BCryptHashProvider implements IHashProvider {
	async hash(data: string): Promise<string> {
		const hashed = await hash(data, 10);
		return hashed;
	}

	async compare(data: string, hashed: string): Promise<boolean> {
		return await compare(data, hashed);
	}
}