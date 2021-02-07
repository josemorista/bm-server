import { Router } from 'express';
import { container } from 'tsyringe';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { IPatientsRepository } from '../../repositories/PatientsRepository/models/IPatientsRepository';
import { classToClass } from 'class-transformer';
import { CreatePatientService } from '../../services/CreatePatientService';

const patientsRouter = Router();

patientsRouter.use(ensureAuthentication);

patientsRouter.get('/', async (request, response) => {
	const patientsRepository: IPatientsRepository = container.resolve('PatientsRepository');
	return response.json(await patientsRepository.findByOwner(request.user.id));
});

patientsRouter.post('/', async (request, response) => {
	const createPatientService = container.resolve(CreatePatientService);
	return response.json(await createPatientService.execute({ ...request.body, ownerId: request.user.id }));
});

patientsRouter.get('/:id', async (request, response) => {
	const patientsRepository: IPatientsRepository = container.resolve('PatientsRepository');
	return response.json(classToClass(await patientsRepository.findById(String(request.params.id))));
});

export { patientsRouter };