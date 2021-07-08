import { IMailProvider, ISendMailDTO } from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export class EtherialMailProvider implements IMailProvider {

	private transporter: Transporter;

	constructor() {
		nodemailer.createTestAccount().then(account => {
			this.transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass
				}
			});
		}).catch(error => {
			console.error(error);
		});
	}

	async sendMail({ to, subject, content }: ISendMailDTO): Promise<void> {
		const message = await this.transporter.sendMail({
			to,
			subject,
			from: 'Bm-diag <noreply@bm-diag.org>',
			html: content
		});
		console.log(`Message sent: ${message.messageId}`);
		console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
	}
}