import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from '../../providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserSessionService } from '../../services/CreateUserSessionService';
import { VerifySessionTokenService } from '../../services/VerifySessionTokenService';

const userSessionsRouter = Router();

userSessionsRouter.post('/', async (request, response) => {
	const usersRepository = new UsersRepository();
	const hashProvider = new BCryptHashProvider();
	const createSessionService = new CreateUserSessionService(usersRepository, hashProvider);
	return response.json(classToPlain(await createSessionService.execute(request.body)));
});

userSessionsRouter.post('/verify-token', async (request, response) => {
	const verifySessionTokenService = new VerifySessionTokenService();
	const token = String(request.body.token);
	return response.json({
		isValid: await verifySessionTokenService.execute(token)
	});
});

export { userSessionsRouter };