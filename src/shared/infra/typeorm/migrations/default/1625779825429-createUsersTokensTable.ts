import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTokensTable1625779825429 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists usersTokens(
			token varchar primary key not null,
			userId varchar not null,
			expiresAt timestamp not null,
			createdAt timestamp not null default current_timestamp,
			updatedAt timestamp not null default current_timestamp,
			constraint usersTokens_users foreign key(userId) references users(id) on delete cascade
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table usersTokens');
	}

}
