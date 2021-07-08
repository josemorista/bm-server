export interface IUserToken {
	userId: string;
	token: string;
	expiresAt: Date | string;
	createdAt: Date | string;
	updatedAt: Date | string;
}