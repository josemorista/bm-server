import { classToClass } from 'class-transformer';
import { Router } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { upload } from '../../../../shared/http/middlewares/upload';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { IExamsRepository } from '../../repositories/ExamsRepository/models/IExamsRepository';
import { ApplySegmentationModelService } from '../../services/ApplySegmentationModelService';
import { CreateExamService } from '../../services/CreateExamService';

const examsRouter = Router();
examsRouter.use(ensureAuthentication);

examsRouter.get('/', async (request, response) => {
	const examsRepository = container.resolve<IExamsRepository>('ExamsRepository');
	const { patientId } = request.query;
	if (!patientId) {
		throw new AppError('Patient id not provided', 400);
	}
	return response.json(await examsRepository.findByPatient(String(patientId)));
});

examsRouter.get('/:examId', async (request, response) => {
	const examsRepository = container.resolve<IExamsRepository>('ExamsRepository');
	const { examId } = request.params;
	const exam = await examsRepository.findById(examId);
	if (exam && exam.patient?.ownerId === request.user.id) {
		return response.json(classToClass(exam));
	}
	throw new AppError('Unauthorized', 401);
});

examsRouter.post('/', upload.single('dcm'), async (request, response) => {
	const createExamService = container.resolve(CreateExamService);
	const { patientId } = request.query;
	return response.json(await createExamService.execute({
		filename: request.file?.filename || '',
		patientId: String(patientId),
		...request.body,
		radioTracerApplicationHours: Number(request.body.radioTracerApplicationHours)
	}));
});

examsRouter.post('/:examId/segmentation', async (request, response) => {
	const applySegmentationModelService = container.resolve(ApplySegmentationModelService);
	const { examId } = request.params;
	return response.json(await applySegmentationModelService.execute(
		{
			id: examId,
			algorithm: request.body.algorithm,
			params: request.body.params
		}
	));
});


export { examsRouter };