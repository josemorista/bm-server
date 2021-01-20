export class AppError {
	status: number;
	message: string;
	constructor(message: string, status = 400) {
		this.message = message;
		this.status = status;
	}
}