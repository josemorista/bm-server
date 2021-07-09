export interface IDateProvider {
	addHours(date: Date, hours: number): Promise<Date>;
	isBefore(date: Date, dateToCompare: Date): Promise<boolean>;

}