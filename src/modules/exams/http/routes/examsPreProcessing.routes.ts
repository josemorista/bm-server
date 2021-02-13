import { Router } from 'express';
import { ClipAndConvertToImgService } from '../../services/ClipAndConvertToImgService';
import { container } from 'tsyringe';
import { DenoiseImgService } from '../../services/DenoiseImgService';

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

examsPreProcessingRouter.patch('/:id/denoise', async (request, response) => {
	const denoiseImgService = container.resolve(DenoiseImgService);
	const { id } = request.params;
	await denoiseImgService.execute({
		id,
		method: request.body.method,
		size: request.body.size
	});
	return response.sendStatus(204);
});

export { examsPreProcessingRouter };