import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IExamDetectionClassification } from '../../../entities/models/IExamDetectionClassification';


@Entity('examsdetectionsclassifications')
export class ExamDetectionClassification implements IExamDetectionClassification {
	@PrimaryColumn({ type: 'varchar' })
	id: string;

	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'varchar' })
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}