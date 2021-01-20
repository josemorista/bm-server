import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExamsTable1611167157870 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists exams (
			id varchar not null primary key,
			name varchar not null,
			patientId varchar not null,
			minDicomValue smallint,
			maxDicomValue smallint,
			currentStep smallint,
			segmentationParams smallint[],
			filteringOperations varchar[],
			processedImg varchar,
			originalImg varchar,
			dicomFile varchar,
			createdAt timestamp not null default current_timestamp,
			updatedAt timestamp not null default current_timestamp,
			foreign key(patientId) references patients(id),
			unique(id)
		);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table exams;');
	}

}
