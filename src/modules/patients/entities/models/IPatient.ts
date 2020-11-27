export interface IPatient {
	id: string;
	name: string;
	age: number;
	sex: 'male' | 'female';
	observations: string;
}