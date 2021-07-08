import { env } from '../shared/env';

export const authConfig = {
	secret: env.secret,
	expiresIn: '7d'
};