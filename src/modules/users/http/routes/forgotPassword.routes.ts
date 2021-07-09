import { Router } from 'express';
import { container } from 'tsyringe';
import { RedefineUserPasswordService } from '../../services/RedefineUserPasswordService';
import { SendForgotPasswordService } from '../../services/SendForgotPasswordService';

const forgotPasswordRouter = Router();

forgotPasswordRouter.post('/', async (request, response) => {
	const { email } = request.body;
	const sendForgotPasswordService = container.resolve(SendForgotPasswordService);
	await sendForgotPasswordService.execute({
		email
	});
	return response.sendStatus(204);
});

forgotPasswordRouter.patch('/', async (request, response) => {
	const { password, token } = request.body;
	const redefineUserPasswordService = container.resolve(RedefineUserPasswordService);
	await redefineUserPasswordService.execute({
		password,
		token
	});
	return response.sendStatus(204);
});

export { forgotPasswordRouter };