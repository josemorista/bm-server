import { AppError } from '../../../../shared/errors/AppError';
import { IUser } from '../../entities/models/IUser';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../../../config/auth';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';

type ICreateUserSessionServiceDTO = Pick<IUser, 'email' | 'password'>;

export class CreateUserSessionService {
	constructor(private usersRepository: IUsersRepository, private hashProvider: IHashProvider) { }

	async execute({ email, password }: ICreateUserSessionServiceDTO): Promise<{ user: Pick<IUser, 'id' | 'firstName'>, token: string }> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('user not found');
		}

		if (!await this.hashProvider.compare(password, user.password)) {
			throw new AppError('wrong password');
		}

		const token = await jwt.sign({ user: { id: user.id, firstName: user.firstName } }, authConfig.secret, {
			expiresIn: authConfig.expiresIn
		});

		return { user, token };
	}

}