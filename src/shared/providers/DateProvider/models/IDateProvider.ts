export interface IDateProvider {
	addHours(date: Date, hours: number): Promise<Date>;
}