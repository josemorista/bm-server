import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';

const errorHandler = async (error: Error, request: Request, response: Response, next?: NextFunction): Promise<Response | void> => {
	console.error(error);

	if (error instanceof AppError) {
		return response.status(error.status).json({
			error: error.message
		});
	}

	return response.status(500).json({
		error: error.message || 'Internal server error'
	});
};

export { errorHandler };