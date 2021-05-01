import { Router } from 'express';
import { container } from 'tsyringe';
import { upload } from '../../../../shared/http/middlewares/upload';
import { ApplySegmentationModelService } from '../../services/ApplySegmentationModelService';
import { CreateExamService } from '../../services/CreateExamService';

const examsRouter = Router();

examsRouter.post('/', upload.single('dcm'), async (request, response) => {
	const createExamService = container.resolve(CreateExamService);
	const { patientId } = request.query;
	return response.json(await createExamService.execute({
		filename: request.file.filename,
		patientId: String(patientId),
		...request.body
	}));
});

examsRouter.post('/:examId/segmentation', async (request, response) => {
	const applySegmentationModelService = container.resolve(ApplySegmentationModelService);
	const { examId } = request.params;
	await applySegmentationModelService.execute(
		{
			id: examId
		}
	);
	return response.sendStatus(204);
});


export { examsRouter };