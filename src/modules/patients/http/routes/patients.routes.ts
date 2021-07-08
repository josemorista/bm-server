import { Router } from 'express';
import { container } from 'tsyringe';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { IPatientsRepository } from '../../repositories/PatientsRepository/models/IPatientsRepository';
import { classToPlain } from 'class-transformer';
import { CreatePatientService } from '../../services/CreatePatientService';
import { DeletePatientService } from '../../services/DeletePatientService';

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

patientsRouter.put('/:id', async (request, response) => {
	const { id } = request.params;
	const patientsRepository: IPatientsRepository = container.resolve('PatientsRepository');
	return response.json(await patientsRepository.updatePatientById(id, request.body));
});

patientsRouter.get('/:id', async (request, response) => {
	const patientsRepository: IPatientsRepository = container.resolve('PatientsRepository');
	return response.json(classToPlain(await patientsRepository.findById(String(request.params.id))));
});

patientsRouter.delete('/:id', async (request, response) => {
	const { user } = request;
	const deletePatientService = container.resolve(DeletePatientService);
	await deletePatientService.execute({
		patientId: request.params.id,
		requestUserId: user.id
	});
	return response.sendStatus(204);
});

export { patientsRouter };