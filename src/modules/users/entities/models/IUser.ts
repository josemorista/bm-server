export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	job: string | null;
	relatedInstitution: string | null;
	avatar: string | null;
	createdAt: Date;
	updatedAt: Date;
}