import { AppError } from '../../../../shared/errors/AppError';
import { IUser } from '../../entities/models/IUser';
import { ICreateUserDTO, IUsersRepository } from '../models/IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
	private users: Array<IUser>;

	constructor() {
		this.users = [];
	}

	async create(data: ICreateUserDTO): Promise<IUser> {
		const user = { ...data, createdAt: new Date(), updatedAt: new Date() };
		this.users.push(user);
		return user;
	}

	async all(): Promise<Array<IUser>> {
		return this.users;
	}

	async findByEmail(email: string): Promise<IUser | undefined> {
		return this.users.find(el => el.email === email);
	}

	async findById(id: string): Promise<IUser> {
		const user = this.users.find(el => el.id === id);
		if (!user) {
			throw new AppError('user does not exists');
		}
		return user;
	}

	async updateUserAvatar(id: string, avatar: string): Promise<void> {
		const index = this.users.findIndex(el => el.id === id);
		if (index === -1) {
			throw new AppError('user does not exists');
		}
		this.users[index].avatar = avatar;
	}

}