import express from 'express';
import cors from 'cors';
import { usersRouter } from './modules/users/http/routes';
import { sessionsRouter } from './modules/sessions/http/routes';
import { patientsRouter } from './modules/patients/http/routes';
import { examsRouter } from './modules/exams/http/routes';

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/users', usersRouter);
server.use('/sessions', sessionsRouter);
server.use('/patients', patientsRouter);
server.use('/exams', examsRouter);

export { server };