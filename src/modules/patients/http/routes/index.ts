import { request, response, Router } from 'express';
import { errorHandler } from '../../../../shared/http/middlewares/errorHandler';
import { MemPatientsRepository } from '../../repositories/PatientsRepository/implementations/MemPatientsRepository';

const patientsRouter = Router();

const patientsRepository = new MemPatientsRepository();

patientsRouter.get('/', async (request, response) => {
	try {
		const { ownerId } = request.query;
		return response.json(await patientsRepository.findByOwner(String(ownerId)));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

patientsRouter.post('/', async (request, response) => {
	try {
		return response.json(await patientsRepository.create(request.body));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

patientsRouter.get('/:id', async (request, response) => {
	try {
		return response.json(await patientsRepository.findById(String(request.params.id)));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

export { patientsRouter };