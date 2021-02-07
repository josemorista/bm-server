import { Router } from 'express';
import { upload } from '../../../../shared/http/middlewares/upload';
import { DiskStorageProvider } from '../../../../shared/providers/StorageProvider/implementations/DiskStorageProvider';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { FakeExamsRepository } from '../../repositories/ExamsRepository/fakes/FakeExamsRepository';
import { CreateExamService } from '../../services/CreateExamService';
import { SegmentExamService } from '../../services/SegmentExamService';

const examsRouter = Router();

examsRouter.use(ensureAuthentication);


/*examsRouter.post('/', upload.single('dicom'), async (request, response) => {
	const examsRepository = new FakeExamsRepository();
	const storageProvider = new DiskStorageProvider();
	const createExamService = new CreateExamService(examsRepository, storageProvider);
	return response.json(await createExamService.execute({
		filename: request.file.filename,
		name: request.file.originalname,
		patientId: request.body.patientId
	}));
});

examsRouter.patch('/:id/segmentation', async (request, response) => {
	const examsRepository = new FakeExamsRepository();
	const { id } = request.params;
	const segmentExamService = new SegmentExamService(examsRepository);
	return response.json(await segmentExamService.execute({
		id,
		min: request.body.min,
		max: request.body.max
	}));
});

examsRouter.get('/:id', async (request, response) => {
	const examsRepository = new FakeExamsRepository();
	const { id } = request.params;
	return response.json(await examsRepository.findById(id));
});

examsRouter.get('/', async (request, response) => {
	const examsRepository = new FakeExamsRepository();
	const { patientId } = request.query;
	return response.json(await examsRepository.findByPatient(String(patientId)));
});*/

export { examsRouter };