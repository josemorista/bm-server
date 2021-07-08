import { IUserToken } from '../../entities/models/IUserToken';

export type ICreateUserTokenDTO = Omit<IUserToken, 'createdAt' | 'updatedAt'>;

export interface IUsersTokenRepository {
	create(data: ICreateUserTokenDTO): Promise<IUserToken>;
	findByToken(token: string): Promise<IUserToken | undefined>;
}