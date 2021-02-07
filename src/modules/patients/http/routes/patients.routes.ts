import { Router } from 'express';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { FakePatientsRepository } from '../../repositories/PatientsRepository/fakes/FakePatientsRepository';
import { IPatientsRepository } from '../../repositories/PatientsRepository/models/IPatientsRepository';

const patientsRouter = Router();

patientsRouter.use(ensureAuthentication);

patientsRouter.get('/', async (request, response) => {
	const patientsRepository: IPatientsRepository = container.resolve('PatientsRepository');
	return response.json(await patientsRepository.findByOwner(request.user.id));
});

patientsRouter.post('/', async (request, response) => {
	const patientsRepository: IPatientsRepository = container.resolve('PatientsRepository');
	return response.json(await patientsRepository.create({ ...request.body, id: uuid(), ownerId: request.user.id }));
});

patientsRouter.get('/:id', async (request, response) => {
	const patientsRepository: IPatientsRepository = container.resolve('PatientsRepository');
	return response.json(await patientsRepository.findById(String(request.params.id)));
});

export { patientsRouter };