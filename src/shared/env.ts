import 'dotenv/config';

const port = process.env.PORT || process.env.port || '3333';

const apiUrl = process.env.apiUrl || 'http://localhost:3333';

const appUrl = process.env.appUrl || 'http://localhost:3000';

const secret = process.env.secret || 'Love';

const storageEngine = process.env.storageEngine || 'disk';

export const env = {
	port,
	apiUrl,
	appUrl,
	secret,
	storageEngine
};