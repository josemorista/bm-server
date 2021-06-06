import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSegmentedExamsTable1620432305215 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('create type segmentationAlgorithms as enum(\'randomForest\', \'SVM\', \'MLP\');');
		await queryRunner.query(`create table if not exists segmentedExams (
				examId varchar not null primary key,
				threshold float,
				algorithm segmentationAlgorithms,
				affectedArea float not null,
				classifiedArea float not null,
				createdAt timestamp not null default current_timestamp,
				updatedAt timestamp not null default current_timestamp,
				unique(examId),
				constraint fkSegmentedExamsExams foreign key(examId) references exams(id) on delete cascade
			);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table segmentedExams;');
		await queryRunner.query('drop type segmentationAlgorithms;');
	}

}
