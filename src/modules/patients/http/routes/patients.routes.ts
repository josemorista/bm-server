import { Router } from 'express';
import { FakePatientsRepository } from '../../repositories/PatientsRepository/fakes/FakePatientsRepository';

const patientsRouter = Router();

const patientsRepository = new FakePatientsRepository();

patientsRouter.get('/', async (request, response) => {
	return response.json(await patientsRepository.findByOwner(request.user.id));
});

patientsRouter.post('/', async (request, response) => {
	return response.json(await patientsRepository.create(request.body));
});

patientsRouter.get('/:id', async (request, response) => {
	return response.json(await patientsRepository.findById(String(request.params.id)));
});

export { patientsRouter };