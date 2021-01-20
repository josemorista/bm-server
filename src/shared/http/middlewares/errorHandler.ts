import { Request, Response, NextFunction } from 'express';

const errorHandler = async (error: Error, request: Request, response: Response, next?: NextFunction): Promise<Response | void> => {
	return response.status(500).json({
		message: 'Internal server error'
	});
};

export { errorHandler };