import { Router } from 'express';
import { MemUsersRepository } from '../../repositories/UsersRepository/implementations/MemUsersRepository';
import { CreateUserService } from '../../services/CreateUserService';

const usersRouter = Router();

const usersRepository = new MemUsersRepository();

usersRouter.post('/', async (request, response) => {
	const createUserService = new CreateUserService(usersRepository);
	return response.json(await createUserService.execute(request.body));
});

export { usersRouter };