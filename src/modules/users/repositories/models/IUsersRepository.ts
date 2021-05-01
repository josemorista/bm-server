import { IUser } from '../../entities/models/IUser';


export type ICreateUserDTO = Omit<IUser, 'createdAt' | 'updatedAt' | 'avatarURL'>;

export interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<IUser>;
	findByEmail(email: string): Promise<IUser | undefined>;
	findById(id: string): Promise<IUser>;
	updateUserAvatar(id: string, avatar: string): Promise<void>;
	all(): Promise<Array<IUser>>;
}