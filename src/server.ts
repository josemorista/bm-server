import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());

server.listen('3333', () => {
	console.log('Server is on, 3333 is the magic port!');
});