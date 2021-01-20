import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../../config/auth';

interface IPayload {
	user: {
		id: string;
	};
}

export const ensureAuthentication = (request: Request, response: Response, next: NextFunction) => {
	const authorization = request.headers.authorization;

	if (!authorization) {
		throw new Error('Token not provided');
	}

	const parts = authorization.split(' ');

	if (parts.length !== 2) {
		throw new Error('Bad formatted token');
	}

	const [, token] = parts;

	try {
		const decoded = jwt.verify(token, authConfig.secret) as IPayload;

		request.user = decoded.user;

		next();

	} catch (error) {
		return response.status(403).json({
			error: 'Forbidden'
		});
	}

};