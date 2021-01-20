import * as jwt from 'jsonwebtoken';
import { authConfig } from '../../../../config/auth';

export class VerifySessionTokenService {
	async execute(token: string): Promise<boolean> {
		try {
			const isValid = !!(await jwt.verify(token, authConfig.secret));
			return isValid;
		} catch (error) {
			return false;
		}
	}
}