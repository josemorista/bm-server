import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/DateProvider/models/IDateProvider';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';
import { IUsersTokenRepository } from '../../repositories/models/IUsersTokenRepository';

interface IRedefineUserPasswordServiceDTO {
	token: string;
	password: string;
}

@injectable()
export class RedefineUserPasswordService {

	constructor(
		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokenRepository,
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('DateProvider')
		private dateProvider: IDateProvider,
		@inject('HashProvider')
		private hashProvider: IHashProvider
	) { }

	async execute({ token, password }: IRedefineUserPasswordServiceDTO): Promise<void> {
		const userToken = await this.usersTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('Token not found', 404);
		}

		if (!this.dateProvider.isBefore(
			new Date(), typeof userToken.expiresAt === 'string' ? new Date(userToken.expiresAt) : userToken.expiresAt)) {
			throw new AppError('Token expired', 401);
		}

		await this.usersRepository.updatePassword(userToken.userId, await this.hashProvider.hash(password));
	}
}