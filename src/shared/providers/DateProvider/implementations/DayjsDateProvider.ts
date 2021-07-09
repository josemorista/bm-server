import { IDateProvider } from '../models/IDateProvider';
import dayjs from 'dayjs';

export class DayJsDateProvider implements IDateProvider {

	async addHours(date: Date, hours: number): Promise<Date> {
		return dayjs(date).add(hours, 'hours').toDate();
	}

	async isBefore(date: Date, dateToCompare: Date): Promise<boolean> {
		return dayjs(date).isBefore(dateToCompare);
	}

}