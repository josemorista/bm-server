import { getRepository, Repository } from 'typeorm';
import { IUserToken } from '../../../entities/models/IUserToken';
import { ICreateUserTokenDTO, IUsersTokenRepository } from '../../../repositories/models/IUsersTokenRepository';
import { UserToken } from '../entities/UserToken';

export class UsersTokensRepository implements IUsersTokenRepository {

	private repository: Repository<UserToken>;

	constructor() {
		this.repository = getRepository(UserToken);
	}

	async create(data: ICreateUserTokenDTO): Promise<IUserToken> {
		const userToken = await this.repository.create(data);
		await this.repository.save(userToken);
		return userToken;
	}

	async findByToken(token: string): Promise<IUserToken | undefined> {
		return await this.repository.findOne(token);
	}

}