import { Router } from 'express';
import { MemUsersRepository } from '../../repositories/UsersRepository/implementations/MemUsersRepository';

const usersRouter = Router();

const usersRepository = new MemUsersRepository();

usersRouter.post('/', async (request, response) => {
	await response.json(await usersRepository.create(request.body));
});

export { usersRouter };