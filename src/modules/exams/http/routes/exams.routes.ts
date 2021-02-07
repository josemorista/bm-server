import { Router } from 'express';
import { container } from 'tsyringe';
import { upload } from '../../../../shared/http/middlewares/upload';
import { ensureAuthentication } from '../../../users/http/middlewares/ensureAuthentication';
import { CreateExamService } from '../../services/CreateExamService';


const examsRouter = Router();

examsRouter.use(ensureAuthentication);

examsRouter.post('/', upload.single('dicom'), async (request, response) => {
	const createExamService = container.resolve(CreateExamService);
	return response.json(await createExamService.execute({
		filename: request.file.filename,
		label: request.body.label,
		patientId: request.body.patientId
	}));
});

export { examsRouter };