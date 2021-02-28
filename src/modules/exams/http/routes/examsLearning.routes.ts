import { Router } from 'express';
import { container } from 'tsyringe';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { ExtractDetectionsFromImgService } from '../../services/ExtractDetectionsFromImgService';

const examsLearningRouter = Router();

examsLearningRouter.post('/:id/extractDetections', async (request, response) => {
	const { id } = request.params;
	const extractDetectionsService = container.resolve(ExtractDetectionsFromImgService);
	return response.json(await extractDetectionsService.execute({
		id
	}));
});

examsLearningRouter.delete('/:id/detections/:detectionId', async (request, response) => {
	const { detectionId } = request.params;
	const examsDetectionsRepository: IExamsDetectionsRepository = container.resolve('ExamsDetectionsRepository');
	await examsDetectionsRepository.deleteById(detectionId);
	return response.sendStatus(204);
});

examsLearningRouter.post('/:id/classify/:detectionId', async (request, response) => {
	//const classifyDetectionService = container.resolve(ClassifyDetectionService);
});

export { examsLearningRouter };