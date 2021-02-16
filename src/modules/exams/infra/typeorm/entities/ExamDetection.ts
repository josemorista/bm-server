import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IExamDetection } from '../../../entities/models/IExamDetection';

@Entity('examsdetections')
export class ExamDetection implements IExamDetection {
	@PrimaryColumn({ type: 'varchar' })
	id: string;

	@Column({ type: 'varchar', name: 'examid' })
	examId: string;

	@Column({ type: 'varchar', nullable: true, name: 'automaticclassificationid' })
	automaticClassificationId: string | null;

	@Column({ type: 'varchar', nullable: true, name: 'revisedclassificationid' })
	revisedClassificationId: string | null;

	@Column({ type: 'float' })
	area: number;

	@Column({ type: 'float' })
	perimeter: number;

	@Column({ type: 'float', name: 'aspectratio' })
	aspectRatio: number;

	@Column({ type: 'float', name: 'centroidx' })
	centroidX: number;

	@Column({ type: 'float', name: 'centroidy' })
	centroidY: number;

	@Column({ type: 'float', name: 'equivalentdiameter' })
	equivalentDiameter: number;

	@Column({ type: 'float' })
	extent: number;

	/*@Column({ type: 'float', name: 'maxintensity' })
	maxIntensity: number;*/

	@Column({ type: 'float', name: 'meanintensity' })
	meanIntensity: number;

	/*@Column({ type: 'float', name: 'minintensity })
	minIntensity: number;*/

	@Column({ type: 'float' })
	orientation: number;

	@Column({ type: 'float' })
	eccentricity: number;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;
}