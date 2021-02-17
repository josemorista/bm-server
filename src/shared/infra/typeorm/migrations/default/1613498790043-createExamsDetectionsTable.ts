import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExamsDetectionsTable1613498790043 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists examsDetections(
			id varchar not null primary key,
			examId varchar not null,
			automaticClassificationId varchar,
			revisedClassificationId varchar,
			area float not null,
			perimeter float not null,
			aspectRatio float not null,
			centroidX float not null,
			centroidY float not null,
			equivalentDiameter float not null,
			extent float not null,
			/*maxIntensity float not null,*/
			meanIntensity float not null,
			/* minIntensity float not null,*/
			orientation float not null,
			eccentricity float not null,
			bboxX0 float not null,
			bboxX1 float not null,
			bboxY0 float not null,
			bboxY1 float not null,
			createdAt timestamp not null default current_timestamp, 
			updatedAt timestamp not null default current_timestamp,
			unique(id),
			foreign key(examId) references exams(id) on delete cascade,
			foreign key(automaticClassificationId) references examsdetectionsclassifications(id) on delete set null,
			foreign key(revisedClassificationId) references examsdetectionsclassifications(id) on delete set null
		);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('drop table examsDetections;');
	}

}
