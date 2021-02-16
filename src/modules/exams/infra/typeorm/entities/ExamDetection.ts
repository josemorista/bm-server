import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IExamDetection } from '../../../entities/models/IExamDetection';

@Entity('examsdetections')
export class ExamDetection implements IExamDetection {
	@PrimaryColumn({ type: 'varchar' })
	id: string;

	@Column({ type: 'varchar' })
	examId: string;

	@Column({ type: 'varchar' })
	automaticClassificationId: string;

	@Column({ type: 'varchar' })
	revisedClassificationId: string;

	@Column({ type: 'int' })
	area: number;

	@Column({ type: 'int' })
	perimeter: number;

	@Column({ type: 'float' })
	aspectRatio: number;

	@Column({ type: 'float' })
	centroidX: number;

	@Column({ type: 'float' })
	centroidY: number;

	@Column({ type: 'float' })
	equivalentDiameter: number;

	@Column({ type: 'float' })
	extent: number;

	/*@Column({ type: 'float' })
	maxIntensity: number;*/

	@Column({ type: 'float' })
	meanIntensity: number;

	/*@Column({ type: 'float' })
	minIntensity: number;*/

	@Column({ type: 'float' })
	orientation: number;

	@Column({ type: 'float' })
	eccentricity: number;

	@Column({ type: 'float' })
	rt: number | null;

	@Column({ type: 'float' })
	qt: number | null;

	@Column({ type: 'character' })
	sex: 'M' | 'F';

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}