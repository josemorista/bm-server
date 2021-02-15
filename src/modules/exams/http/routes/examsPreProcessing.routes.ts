import { Router } from 'express';
import { ClipAndConvertToImgService } from '../../services/ClipAndConvertToImgService';
import { container } from 'tsyringe';
import { DenoiseImgService } from '../../services/DenoiseImgService';
import { HistogramEqualizationService } from '../../services/HistogramEqualizationService';
import { SegmentImgService } from '../../services/SegmentImgService';
import { ApplyEdgeFilterService } from '../../services/ApplyEdgeFilterService';

const examsPreProcessingRouter = Router();

examsPreProcessingRouter.post('/:id/clipAndConvertToImage', async (request, response) => {
	const clipAndConvertToImgService = container.resolve(ClipAndConvertToImgService);
	const { id } = request.params;
	await clipAndConvertToImgService.execute({
		id,
		maxDicomValue: request.body.maxDicomValue
	});
	return response.sendStatus(204);
});

examsPreProcessingRouter.patch('/:id/applyDenoiseFilter', async (request, response) => {
	const denoiseImgService = container.resolve(DenoiseImgService);
	const { id } = request.params;
	await denoiseImgService.execute({
		id,
		method: request.body.method,
		size: request.body.size
	});
	return response.sendStatus(204);
});

examsPreProcessingRouter.patch('/:id/applyHistogramEqualization', async (request, response) => {
	const { id } = request.params;
	const histogramEqualizationService = container.resolve(HistogramEqualizationService);
	await histogramEqualizationService.execute({
		id,
		method: request.body.method
	});
	return response.sendStatus(204);
});

examsPreProcessingRouter.patch('/:id/applySegmentation', async (request, response) => {
	const { id } = request.params;
	const segmentImgService = container.resolve(SegmentImgService);
	await segmentImgService.execute({
		id,
		method: request.body.method
	});
	return response.sendStatus(204);
});

examsPreProcessingRouter.patch('/:id/applyEdgeFilter', async (request, response) => {
	const { id } = request.params;
	const applyEdgeFilterService = container.resolve(ApplyEdgeFilterService);
	await applyEdgeFilterService.execute({
		id,
		method: request.body.method
	});
	return response.sendStatus(204);
});

export { examsPreProcessingRouter };