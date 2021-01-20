import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPatientsTable1611167114853 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists patients(
				id varchar not null primary key,
				name varchar not null,
				birthDate timestamp not null,
				sex varchar,
				history varchar not null,
				ownerId varchar not null,
				createdAt timestamp not null default current_timestamp,
				updatedAt timestamp not null default current_timestamp,
				unique(id),
				foreign key(ownerId) references users(id)
			);
			`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table patients');
	}

}
