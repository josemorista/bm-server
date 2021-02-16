import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExamsDetectionsTable1613498790043 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists examsDetections(
			id varchar not null primary key,
			examId varchar not null,
			automaticClassificationId varchar not null,
			revisedClassificationId varchar not null,
			area int not null,
			perimeter int not null,
			aspectRatio float not null,
			centroidY float not null,
			equivalentDiameter float not null,
			extent float not null,
			maxIntensity float not null,
			meanIntensity float not null,
			minIntensity float not null,
			orientation float not null,
			eccentricity float not null,
			rt decimal(2,1) default 0.5,
			qt decimal(2,1) default 0.5,
			sex character(1),
			createdAt timestamp not null default current_timestamp, 
			updatedAt timestamp not null default current_timestamp,
			unique(id),
			foreign key(examId) references exams(id) on delete cascade,
			foreign key(automaticClassificationId) references examsdetectionsclassifications(id) on delete cascade,
			foreign key(revisedClassificationId) references examsdetectionsclassifications(id) on delete cascade
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table examsDetections;');
	}

}
