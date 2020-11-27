
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../../../config/auth';
import { IUsersRepository } from '../../../users/repositories/UsersRepository/models/IUsersRepository';

interface CreateSessionServiceDTO {
	email: string;
	password: string;
}

export class CreateSessionService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ email, password }: CreateSessionServiceDTO) {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new Error('User not found');
		}

		if (!await bcrypt.compare(password, user.password)) {
			throw new Error('Wrong password');
		}

		return {
			user: { ...user, password: undefined },
			token: jwt.sign({ user: { id: user.id } }, authConfig.secret, {
				expiresIn: authConfig.expiresIn
			})
		};

	}
}