import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPatientsTable1611167114853 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists patients(
				id varchar not null primary key,
				name varchar not null,
				birthDate timestamp,
				dicomPatientId varchar,
				sex varchar not null,			
				previousBoneLesions boolean,
				previousQt boolean,
				previousRt boolean,
				previousCancerDiagnosis boolean,
				previousCancerDiagnosisType varchar,
				observations varchar not null default '',
				ownerId varchar not null,
				createdAt timestamp not null default current_timestamp,
				updatedAt timestamp not null default current_timestamp,
				unique(id),
				unique(name),
				foreign key(ownerId) references users(id) on delete cascade
			);
			`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table patients');
	}

}
