import { Router } from 'express';
import { container } from 'tsyringe';
import { ExtractDetectionsFromImgService } from '../../services/ExtractDetectionsFromImgService';

const examsLearningRouter = Router();

examsLearningRouter.post('/:id/extractDetections', async (request, response) => {
	const { id } = request.params;
	const extractDetectionsService = container.resolve(ExtractDetectionsFromImgService);
	return response.json(await extractDetectionsService.execute({
		id
	}));
});

export { examsLearningRouter };