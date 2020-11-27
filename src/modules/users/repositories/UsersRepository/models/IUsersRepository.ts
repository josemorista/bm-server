import { IUser } from '../../../entities/User/models/IUser';

export interface IUsersRepository {
	create(data: Omit<IUser, 'id'>): Promise<IUser>;
	findByEmail(email: string): Promise<IUser | undefined>;
}