import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { IUser } from '../../entities/models/IUser';

interface IDecodedAuthRequest {
	user: IUser
}

export const ensureAuthentication = (request: Request, response: Response, next: NextFunction): void => {
	const authHeader = request.headers.authorization;
	if (!authHeader) {
		throw new AppError('credentials not provided', 403);
	}
	const [bearer, token] = authHeader.split(' ');
	if (bearer !== 'Bearer') {
		throw new AppError('bad formatted credentials', 400);
	}
	if (!token) {
		throw new AppError('token not provided', 403);
	}

	try {
		const decoded = jwt.verify(token, authConfig.secret) as IDecodedAuthRequest;
		request.user = {
			id: decoded.user.id,
			firstName: decoded.user.firstName
		};
		return next();
	} catch (error) {
		throw new AppError('token invalid or expired', 403);
	}

};