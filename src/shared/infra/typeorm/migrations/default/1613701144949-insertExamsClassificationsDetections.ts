import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertExamsClassificationsDetections1613701144949 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('insert into examsDetectionsClassifications(id, name, description) values (\'6ccb78b2-44e4-4aae-ab8b-23cde8585db9\', \'extravasamento de radiotraçador\', \'Se deve a extravasamento da radiotraçador no local da injeção\') on conflict(id) do nothing;');
		await queryRunner.query('insert into examsDetectionsClassifications(id, name, description) values (\'8eb39b0d-4c10-4b1f-9083-c8f48666a48c\', \'implante osteoblástico\', \'Metástases ósseas, é a forma mais frequente de câncer no esqueleto \') on conflict(id) do nothing;');
		await queryRunner.query('insert into examsDetectionsClassifications(id, name, description) values(\'e3b044b1-c1db-4d71-9c08-a9c760730fd5\', \'processo osteoarticular degenerativo\', \'Lesões ósseas/inflamatórias\') on conflict(id) do nothing;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('delete from examsDetectionsClassifications where id=\'6ccb78b2-44e4-4aae-ab8b-23cde8585db9\'');
		await queryRunner.query('delete from examsDetectionsClassifications where id=\'8eb39b0d-4c10-4b1f-9083-c8f48666a48c\'');
		await queryRunner.query('delete from examsDetectionsClassifications where id=\'e3b044b1-c1db-4d71-9c08-a9c760730fd5\'');
	}

}
