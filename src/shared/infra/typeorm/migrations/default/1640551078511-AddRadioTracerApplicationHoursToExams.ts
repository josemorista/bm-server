import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRadioTracerApplicationHoursToExams1640551078511 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table exams add column radiotracerapplicationhours smallint not null default 3;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table exams drop column radiotracerapplicationhours;');
	}

}
