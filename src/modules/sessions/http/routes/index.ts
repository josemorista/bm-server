import { Router } from 'express';
import { errorHandler } from '../../../../shared/http/middlewares/errorHandler';
import { MemUsersRepository } from '../../../users/repositories/UsersRepository/implementations/MemUsersRepository';
import { CreateSessionService } from '../../services/CreateSessionService';

const sessionsRouter = Router();

const usersRepository = new MemUsersRepository();

sessionsRouter.post('/', async (request, response) => {
	try {
		const newSessionService = new CreateSessionService(usersRepository);
		return response.json(await newSessionService.execute(request.body));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

export { sessionsRouter };