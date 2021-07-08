import { IMailProvider, ISendMailDTO } from '../models/IMailProvider';

export class LoggerMailProvider implements IMailProvider {
	async sendMail(data: ISendMailDTO): Promise<void> {
		console.log(data);
	}

}