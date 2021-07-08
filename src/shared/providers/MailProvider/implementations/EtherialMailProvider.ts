import { IMailProvider, ISendMailDTO } from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { AppError } from '../../../errors/AppError';

export class EtherialMailProvider implements IMailProvider {

	private transporter: Transporter | null;

	private async createTransporter(): Promise<void> {
		const account = await nodemailer.createTestAccount();
		this.transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass
			}
		});
	}

	async sendMail({ to, subject, content }: ISendMailDTO): Promise<void> {
		if (!this.transporter) {
			await this.createTransporter();
		}
		if (!this.transporter) throw new AppError('Could not instantiate transporter', 500);
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