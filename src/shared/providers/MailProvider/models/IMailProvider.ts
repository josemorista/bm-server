export interface ISendMailDTO {
	from?: string;
	to: string;
	subject: string;
	content: string;
}

export interface IMailProvider {
	sendMail(data: ISendMailDTO): Promise<void>;
}