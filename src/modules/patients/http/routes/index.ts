import { Router } from 'express';
import { MemPatientsRepository } from '../../repositories/PatientsRepository/implementations/MemPatientsRepository';

const patientsRouter = Router();

const patientsRepository = new MemPatientsRepository();

patientsRouter.get('/', async (request, response) => {
	const { ownerId } = request.query;
	return response.json(await patientsRepository.findByOwner(String(ownerId)));
});

export { patientsRouter };