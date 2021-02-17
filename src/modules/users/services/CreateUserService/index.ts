import { AppError } from '../../../../shared/errors/AppError';
import { IUser } from '../../entities/models/IUser';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';
import { v4 as uuid } from 'uuid';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';

type ICreateUserServiceDTO = Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'> &
	Partial<Pick<IUser, | 'relatedInstitution' | 'job'>>;

export class CreateUserService {
	constructor(private usersRepository: IUsersRepository, private hashProvider: IHashProvider) { }

	async execute({ email, firstName, lastName, password, relatedInstitution, job }: ICreateUserServiceDTO, id?: string): Promise<IUser> {
		const already = await this.usersRepository.findByEmail(email);
		if (already) {
			throw new AppError('user already exists');
		}

		const user = await this.usersRepository.create({
			id: id || uuid(),
			avatar: null,
			firstName,
			lastName,
			email,
			relatedInstitution: relatedInstitution || null,
			job: job || null,
			password: await this.hashProvider.hash(password)
		});

		return user;
	}

}