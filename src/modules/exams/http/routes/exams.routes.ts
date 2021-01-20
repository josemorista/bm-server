import { Router } from 'express';
import { upload } from '../../../../shared/http/middlewares/upload';
import { MemExamsRepository } from '../../repositories/ExamsRepository/implementations/MemExamsRepository';
import { CreateExamService } from '../../services/CreateExamService';
import { GetExamService } from '../../services/GetExamService';
import { SegmentExamService } from '../../services/SegmentExamService';

const examsRouter = Router();

const examsRepository = new MemExamsRepository();

examsRouter.post('/', upload.single('dicom'), async (request, response) => {
	const createExamService = new CreateExamService(examsRepository);
	return response.json(await createExamService.execute({
		filename: request.file.filename,
		name: request.file.originalname,
		patientId: request.body.patientId
	}));
});

examsRouter.patch('/:id/segmentation', async (request, response) => {
	const { id } = request.params;
	const segmentExamService = new SegmentExamService(examsRepository);
	return response.json(await segmentExamService.execute({
		id,
		min: request.body.min,
		max: request.body.max
	}));
});

examsRouter.get('/:id', async (request, response) => {
	const { id } = request.params;
	const getExamService = new GetExamService(examsRepository);
	return response.json(await getExamService.execute(id));
});

examsRouter.get('/', async (request, response) => {
	const { patientId } = request.query;
	return response.json(await examsRepository.findByPatient(String(patientId)));
});

export { examsRouter };