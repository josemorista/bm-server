import { Router } from 'express';
import { ClipAndConvertToImgService } from '../../services/ClipAndConvertToImgService';
import { container } from 'tsyringe';
import { DenoiseImgService } from '../../services/DenoiseImgService';
import { SegmentImgService } from '../../services/SegmentImgService';
import { ApplyEdgeFilterService } from '../../services/ApplyEdgeFilterService';
import { CalculateImgHistogramService } from '../../services/CalculateImgHistogramService';

const examsPreProcessingRouter = Router();

examsPreProcessingRouter.post('/:id/clipAndConvertToImage', async (request, response) => {
	const clipAndConvertToImgService = container.resolve(ClipAndConvertToImgService);
	const { id } = request.params;
	await clipAndConvertToImgService.execute({
		id
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


examsPreProcessingRouter.patch('/:id/applySegmentation', async (request, response) => {
	const { id } = request.params;
	const segmentImgService = container.resolve(SegmentImgService);
	await segmentImgService.execute({
		id,
		cumulative: request.body.cumulative,
		method: request.body.method,
		randomWalkerParams: request.body.randomWalkerParams,
		kMeansParams: request.body.kMeansParams
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

examsPreProcessingRouter.get('/:id/calculateHistogram', async (request, response) => {
	const { id } = request.params;
	console.log('here');
	const calculateImgHistogramsService = container.resolve(CalculateImgHistogramService);
	const file = await calculateImgHistogramsService.execute({
		id,
		calculateHistogramFrom: String(request.query.calculateHistogramFrom)
	});
	return response.send('data:image/png;base64,' + file);
});

export { examsPreProcessingRouter };