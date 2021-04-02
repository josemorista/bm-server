import { Router } from 'express';
import { container } from 'tsyringe';
import { IExamsDetectionsRepository } from '../../repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { ClassifyDetectionsService } from '../../services/ClassifyDetectionsService';
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

examsLearningRouter.patch('/:id/detections/:detectionId', async (request, response) => {
	const { detectionId } = request.params;
	const examsDetectionsRepository: IExamsDetectionsRepository = container.resolve('ExamsDetectionsRepository');
	await examsDetectionsRepository.updateRevisedClassificationId({
		id: detectionId,
		revisedClassificationId: request.body.revisedClassificationId
	});
	return response.sendStatus(204);
});

examsLearningRouter.post('/:id/classify', async (request, response) => {
	const { id } = request.params;
	const classifyDetectionService = container.resolve(ClassifyDetectionsService);
	response.json(await classifyDetectionService.execute({
		examId: id,
		method: 'dt'
	}));
});

export { examsLearningRouter };