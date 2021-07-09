import { AppError } from '../../../../shared/errors/AppError';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/models/IStorageProvider';
import { IUser } from '../../entities/models/IUser';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';

interface IChangeUserAvatarServiceDTO {
	userId: string;
	tmpFileName: string;
}

export class ChangeUserAvatarService {

	constructor(private usersRepository: IUsersRepository, private storageProvider: IStorageProvider) { }

	async execute({ userId, tmpFileName }: IChangeUserAvatarServiceDTO): Promise<IUser> {
		const user = await this.usersRepository.findById(userId);
		if (!user) {
			throw new AppError('user does not exists');
		}
		if (user.avatar) {
			this.storageProvider.remove(user.avatar);
		}
		const newAvatar = await this.storageProvider.save(tmpFileName);
		this.usersRepository.updateAvatar(userId, newAvatar);
		user.avatar = newAvatar;
		return user;
	}
}