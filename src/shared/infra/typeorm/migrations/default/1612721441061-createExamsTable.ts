import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExamsTable1612721441061 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists exams(
			id varchar primary key not null,
			label varchar not null,
			patientId varchar not null,
			category varchar not null,
			pixelArea float default 0,
			denoisedImgLocation varchar,
			segmentedImgLocation varchar,
			edgedImgLocation varchar,
			originalImgLocation varchar,
			dicomFileLocation varchar not null,
			createdAt timestamp not null default current_timestamp,
			updatedAt timestamp not null default current_timestamp,
			unique(id),
			foreign key(patientId) references patients(id) on delete cascade
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table exams;');
	}

}
