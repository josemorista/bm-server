import { MigrationInterface, QueryRunner } from 'typeorm';

export class addJobAndInstitutionToUsersTable1613584322783 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table users add column job varchar;');
		await queryRunner.query('alter table users add column relatedInstitution varchar;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('alter table users drop column job');
		await queryRunner.query('alter table users drop column relatedinstitution');
	}

}
