import { Router } from 'express';
import { errorHandler } from '../../../../shared/http/middlewares/errorHandler';
import { uploader } from '../../../../shared/http/middlewares/uploader';
import { MemExamsRepository } from '../../repositories/ExamsRepository/implementations/MemExamsRepository';
import { CreateExamService } from '../../services/CreateExamService';
import { GetExamService } from '../../services/GetExamService';
import { SegmentExamService } from '../../services/SegmentExamService';

const examsRouter = Router();

const examsRepository = new MemExamsRepository();

examsRouter.post('/', uploader.single('dicom'), async (request, response) => {
	try {
		const createExamService = new CreateExamService(examsRepository);
		return response.json(await createExamService.execute({
			filename: request.file.filename,
			name: request.file.originalname,
			patientId: request.body.patientId
		}));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

examsRouter.patch('/:id/segmentation', async (request, response) => {
	try {
		const { id } = request.params;
		const segmentExamService = new SegmentExamService(examsRepository);
		return response.json(await segmentExamService.execute({
			id,
			min: request.body.min,
			max: request.body.max
		}));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

examsRouter.get('/:id', async (request, response) => {
	try {
		const { id } = request.params;
		const getExamService = new GetExamService(examsRepository);
		return response.json(await getExamService.execute(id));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

examsRouter.get('/', async (request, response) => {
	try {
		const { patientId } = request.query;
		return response.json(await examsRepository.findByPatient(String(patientId)));
	} catch (error) {
		errorHandler(error, request, response);
	}
});

export { examsRouter };