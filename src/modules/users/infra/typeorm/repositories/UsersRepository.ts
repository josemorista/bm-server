import { ICreateUserDTO, IUsersRepository } from '../../../repositories/models/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUser } from '../../../entities/models/IUser';
import { AppError } from '../../../../../shared/errors/AppError';
export class UsersRepository implements IUsersRepository {

	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	async create(data: ICreateUserDTO): Promise<IUser> {
		const user = this.ormRepository.create(data);
		await this.ormRepository.save(user);
		return user;
	}

	async findById(id: string): Promise<IUser> {
		const user = await this.ormRepository.findOne(id);
		if (!user) {
			throw new AppError('user does not exits');
		}
		return user;
	}

	async findByEmail(email: string): Promise<IUser | undefined> {
		const users = await this.ormRepository.find({ where: { email } });
		return users[0];
	}

	async all(): Promise<Array<IUser>> {
		return await this.ormRepository.find();
	}

	async updateAvatar(id: string, avatar: string): Promise<void> {
		await this.ormRepository.update({ id }, { avatar });
	}

	async updatePassword(id: string, password: string): Promise<void> {
		await this.ormRepository.update({ id }, { password });
	}

}