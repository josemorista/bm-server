import { IUsersRepository } from '../models/IUsersRepository';
import { v4 as uuid } from 'uuid';
import { IUser } from '../../../entities/User/models/IUser';

const users: Array<IUser> = [];

export class MemUsersRepository implements IUsersRepository {

	async create(data: Omit<IUser, 'id'>, id?: string): Promise<IUser> {
		const User = {
			id: id || uuid(),
			...data
		};
		users.push(User);
		return User;
	}

	async findByEmail(email: string): Promise<IUser | undefined> {
		return users.find(el => el.email === email);
	}
}