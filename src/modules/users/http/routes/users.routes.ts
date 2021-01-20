import { Router } from 'express';
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';
import { classToClass } from 'class-transformer';
import { CreateUserService } from '../../services/CreateUserService';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import { userSessionsRouter } from './userSessions.routes';

import { ChangeUserAvatarService } from '../../services/ChangeUserAvatarService';
import { DiskStorageProvider } from '../../../../shared/providers/StorageProvider/implementations/DiskStorageProvider';
import { upload } from '../../../../shared/http/middlewares/upload';
import { BCryptHashProvider } from '../../providers/HashProvider/implementations/BCryptHashProvider';

const usersRouter = Router();

usersRouter.use('/sessions', userSessionsRouter);

usersRouter.post('/', async (request, response) => {
	const usersRepository = new UsersRepository();
	const hashProvider = new BCryptHashProvider();
	const createUserService = new CreateUserService(usersRepository, hashProvider);
	return response.json(classToClass(await createUserService.execute(request.body)));
});

usersRouter.get('/:id', ensureAuthentication, async (request, response) => {
	const usersRepository = new UsersRepository();
	return response.json(classToClass(await usersRepository.findById(request.params.id)));
});

usersRouter.get('/', ensureAuthentication, async (request, response) => {
	const usersRepository = new UsersRepository();
	return response.json(classToClass(await usersRepository.all()));
});

usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), async (request, response) => {
	const usersRepository = new UsersRepository();
	const diskStorageProvider = new DiskStorageProvider();
	const changeUserAvatarService = new ChangeUserAvatarService(usersRepository, diskStorageProvider);
	return response.json(await changeUserAvatarService.execute({
		userId: request.user.id,
		tmpFileName: request.file.filename
	}));
});

export { usersRouter };