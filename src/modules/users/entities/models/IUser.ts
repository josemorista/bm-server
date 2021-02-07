export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	avatar: string | null;
	createdAt: Date;
	updatedAt: Date;
}