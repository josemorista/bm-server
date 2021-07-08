import { Router } from 'express';
import { container } from 'tsyringe';
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

export { forgotPasswordRouter };