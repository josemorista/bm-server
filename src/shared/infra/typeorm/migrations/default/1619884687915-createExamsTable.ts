import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExamsTable1619884687915 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('create type examCategory as enum(\'ant\', \'post\', \'cra\');');
		await queryRunner.query(`create table if not exists exams(
			id varchar not null primary key,
			label varchar not null,
			patientId varchar not null,
			pixelArea float,
			date timestamp not null,
			category examCategory,
			dicomFileLocation varchar not null,
			originalImageLocation varchar,
			resultImageLocation varchar,
			edgedResultImageLocation varchar,
			overlayImageLocation varchar,
			createdAt timestamp not null default current_timestamp,
			updatedAt timestamp not null default current_timestamp,
			unique(id),
			constraint fk_exam_patient foreign key(patientId) references patients(id) on delete cascade
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table exams');
		await queryRunner.query('drop type examCategory');
	}

}
