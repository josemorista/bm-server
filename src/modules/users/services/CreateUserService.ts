
import bcrypt from 'bcrypt';
import { IUsersRepository } from '../repositories/UsersRepository/models/IUsersRepository';

interface CreateUserServiceDTO {
	name: string;
	email: string;
	password: string;
}

export class CreateUserService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ email, password, name }: CreateUserServiceDTO) {

		if (await this.usersRepository.findByEmail(email)) {
			throw new Error('Email not available');
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password: await bcrypt.hash(password, 10)
		}, '1');

		return { ...user, password: undefined };

	}
}