import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeExamsColumns1614035287762 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table exams drop column maxDicomValue');
		await queryRunner.query('alter table exams drop column currentStep');
		await queryRunner.query('alter table exams drop column denoiseFilter');
		await queryRunner.query('alter table exams drop column histogramEqualization');
		await queryRunner.query('alter table exams drop column edgeFilter');
		await queryRunner.query('alter table exams drop column segmentationMethod');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table exams add column maxDicomValue smallint not null');
		await queryRunner.query('alter table exams add column currentStep smallint not null default 0');
		await queryRunner.query('alter table exams add column denoiseFilter varchar');
		await queryRunner.query('alter table exams add column histogramEqualization varchar');
		await queryRunner.query('alter table exams add column edgeFilter varchar');
		await queryRunner.query('alter table exams add column segmentationMethod varchar');
	}

}
