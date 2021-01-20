import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1611165800840 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists users (
			id varchar not null primary key,
			firstName varchar not null,
			lastName varchar not null,
			password varchar not null,
			email varchar not null,
			cpfOrCnpj varchar not null unique,
			birthDate timestamp,
			avatar varchar,
			createdAt timestamp not null default current_timestamp,
			updatedAt timestamp not null default current_timestamp,
			unique(email),
			unique(id),
			unique(cpfOrCnpj)
		);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table users;');
	}

}
