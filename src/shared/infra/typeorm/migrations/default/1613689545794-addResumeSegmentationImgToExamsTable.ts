import { MigrationInterface, QueryRunner } from 'typeorm';

export class addResumeSegmentationImgToExamsTable1613689545794 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table exams add column resumeSegmentationImgLocation varchar;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table exams drop column resumeSegmentationImgLocation');
	}

}
