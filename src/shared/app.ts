import 'reflect-metadata';
import express, { request, response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { usersRouter } from '../modules/users/http/routes/users.routes';
import { patientsRouter } from '../modules/patients/http/routes/patients.routes';
import { examsRouter } from '../modules/exams/http/routes/exams.routes';
import { uploadConfig } from '../config/upload';
import { errorHandler } from './http/middlewares/errorHandler';
import './infra/typeorm/databases';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	return response.json({
		message: 'Enjoy the silence'
	});
});

app.use('/uploads', express.static(uploadConfig.diskStorageProviderConfig.destination));

app.use('/users', usersRouter);
app.use('/patients', patientsRouter);
app.use('/exams', examsRouter);

app.use(errorHandler);

app.listen('3333', () => {
	console.log('app is on, 3333 is the magic port!');
});
