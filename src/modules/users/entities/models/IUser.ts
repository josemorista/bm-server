export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	cpfOrCnpj: string;
	birthDate: Date | null;
	avatar: string | null;
	createdAt: Date;
	updatedAt: Date;
}