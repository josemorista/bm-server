import { Router } from 'express';
import { MemUsersRepository } from '../../../users/repositories/UsersRepository/implementations/MemUsersRepository';
import { CreateSessionService } from '../../services/CreateSessionService';

const sessionsRouter = Router();

const usersRepository = new MemUsersRepository();

sessionsRouter.post('/', async (request, response) => {
	const newSessionService = new CreateSessionService(usersRepository);
	return response.json(await newSessionService.execute(request.body));
});

export { sessionsRouter };