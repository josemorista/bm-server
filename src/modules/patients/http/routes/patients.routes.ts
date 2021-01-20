import { Router } from 'express';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { FakePatientsRepository } from '../../repositories/PatientsRepository/fakes/FakePatientsRepository';

const patientsRouter = Router();

patientsRouter.use(ensureAuthentication);

patientsRouter.get('/', async (request, response) => {
	const patientsRepository = new FakePatientsRepository();
	return response.json(await patientsRepository.findByOwner(request.user.id));
});

patientsRouter.post('/', async (request, response) => {
	const patientsRepository = new FakePatientsRepository();
	return response.json(await patientsRepository.create(request.body));
});

patientsRouter.get('/:id', async (request, response) => {
	const patientsRepository = new FakePatientsRepository();
	return response.json(await patientsRepository.findById(String(request.params.id)));
});

export { patientsRouter };