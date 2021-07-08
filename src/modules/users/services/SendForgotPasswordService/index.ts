import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';
import { IUsersTokenRepository } from '../../repositories/models/IUsersTokenRepository';
import { v4 as uuid } from 'uuid';
import { IDateProvider } from '../../../../shared/providers/DateProvider/models/IDateProvider';
import { IMailProvider } from '../../../../shared/providers/MailProvider/models/IMailProvider';
import { ITemplateEngineProvider } from '../../../../shared/providers/TemplateEngineProvider/models/ITemplateEngineProvider';
import path from 'path';
import { env } from '../../../../shared/env';

interface ISendForgotPasswordServiceDTO {
	email: string;
}

@injectable()
export class SendForgotPasswordService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokenRepository,
		@inject('DateProvider')
		private dateProvider: IDateProvider,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
		@inject('TemplateEngineProvider')
		private templateEngineProvider: ITemplateEngineProvider
	) { }

	async execute({ email }: ISendForgotPasswordServiceDTO): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('User not found');
		}

		await this.usersTokensRepository.deleteAllFromUserId(user.id);

		const token = `${user.id}-${uuid()}`;

		await this.usersTokensRepository.create({
			userId: user.id,
			token,
			expiresAt: await this.dateProvider.addHours(new Date(), 3)
		});

		await this.mailProvider.sendMail({
			to: email,
			subject: 'Did you forgot your password? Help is here!',
			content: await this.templateEngineProvider.render(
				{
					templatePath: path.resolve(__dirname, 'templates', 'hbs', 'forgotEmail.hbs'),
					context: {
						user,
						token,
						applicationURL: env.appUrl
					}
				})
		});
	}
}