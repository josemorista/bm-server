import { Router } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { upload } from '../../../../shared/http/middlewares/upload';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { CreateExamService } from '../../services/CreateExamService';
import { examsPreProcessingRouter } from './examsPreProcessing.routes';
import { classToPlain } from 'class-transformer';

const examsRouter = Router();

examsRouter.use(ensureAuthentication);

examsRouter.use('/preProcessing', examsPreProcessingRouter);

examsRouter.get('/', async (request, response) => {
	const { patientId } = request.query;
	if (!patientId) {
		throw new AppError('patientId not provided');
	}
	const examsRepository: IExamsRepository = container.resolve('ExamsRepository');
	return response.json(classToPlain((await examsRepository.findByPatient(String(patientId)))));
});

examsRouter.get('/:id', async (request, response) => {
	const { id } = request.params;
	const examsRepository: IExamsRepository = container.resolve('ExamsRepository');
	return response.json(classToPlain(await examsRepository.findById(id)));
});

examsRouter.post('/', upload.single('dicom'), async (request, response) => {
	const createExamService = container.resolve(CreateExamService);
	return response.json(await createExamService.execute({
		filename: request.file.filename,
		label: request.body.label,
		patientId: request.body.patientId,
		category: request.body.category
	}));
});

export { examsRouter };