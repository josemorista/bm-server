import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPatientsTable1611167114853 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('create type gender as enum (\'M\', \'F\');');
		await queryRunner.query(`create table if not exists patients(
				id varchar not null primary key,
				name varchar not null,
				birthDate timestamp,
				dicomPatientId varchar,
				gender gender not null,
				description varchar not null default '',
				ownerId varchar not null,
				createdAt timestamp not null default current_timestamp,
				updatedAt timestamp not null default current_timestamp,
				unique(id),
				constraint fk_patient_user foreign key(ownerId) references users(id) on delete cascade
			);
			`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table patients');
		await queryRunner.query('drop type gender');
	}

}
