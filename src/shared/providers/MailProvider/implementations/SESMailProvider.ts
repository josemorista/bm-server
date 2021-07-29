import { IMailProvider, ISendMailDTO } from '../models/IMailProvider';
import aws, { SES } from 'aws-sdk';
import { createTransport, Transporter } from 'nodemailer';
import { mailConfig } from '../../../../config/mail';

export class SESMailProvider implements IMailProvider {

	private transporter: Transporter;
	private ses: SES;

	constructor() {
		this.ses = new aws.SES({
			region: 'us-east-1'
		});
		this.transporter = createTransport({
			SES: { ses: this.ses, aws }
		});
	}

	async sendMail({ content, subject, to }: ISendMailDTO): Promise<void> {
		await this.transporter.sendMail({
			to,
			from: mailConfig.SES.from,
			subject,
			html: content
		});
	}

}