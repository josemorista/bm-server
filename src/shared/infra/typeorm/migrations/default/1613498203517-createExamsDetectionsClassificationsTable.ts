import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExamsDetectionsClassificationsTable1613498203517 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists examsDetectionsClassifications(
			id varchar not null primary key,
			name varchar not null,
			description varchar not null default '',
			createdAt timestamp with time zone default current_timestamp,
			updatedAt timestamp with time zone default current_timestamp,
			unique(id)
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table examsDetectionsClassifications');
	}

}
