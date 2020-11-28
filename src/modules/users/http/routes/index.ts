import { Router } from 'express';
import { errorHandler } from '../../../../shared/http/middlewares/errorHandler';
import { MemUsersRepository } from '../../repositories/UsersRepository/implementations/MemUsersRepository';
import { CreateUserService } from '../../services/CreateUserService';

const usersRouter = Router();

const usersRepository = new MemUsersRepository();

usersRouter.post('/', async (request, response) => {
	try {
		const createUserService = new CreateUserService(usersRepository);
		return response.json(await createUserService.execute(request.body));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

export { usersRouter };