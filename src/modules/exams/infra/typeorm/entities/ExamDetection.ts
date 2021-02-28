import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IExam } from '../../../entities/models/IExam';
import { IExamDetection } from '../../../entities/models/IExamDetection';
import { IExamDetectionClassification } from '../../../entities/models/IExamDetectionClassification';
import { Exam } from './Exam';
import { ExamDetectionClassification } from './ExamDetectionClassification';

@Entity('examsdetections')
export class ExamDetection implements IExamDetection {
	@PrimaryColumn({ type: 'varchar' })
	id: string;

	@Column({ type: 'varchar', name: 'examid' })
	examId: string;

	@ManyToOne(() => Exam, exam => exam.id)
	@JoinColumn({ name: 'examid', referencedColumnName: 'id' })
	exam: IExam;

	@Column({ type: 'varchar', nullable: true, name: 'automaticclassificationid' })
	automaticClassificationId: string | null;

	@ManyToOne(() => ExamDetectionClassification, automaticClassification => automaticClassification.id)
	@JoinColumn({ name: 'automaticclassificationid', referencedColumnName: 'id' })
	automaticClassification: IExamDetectionClassification;

	@Column({ type: 'varchar', nullable: true, name: 'revisedclassificationid' })
	revisedClassificationId: string | null;

	@ManyToOne(() => ExamDetectionClassification, automaticClassification => automaticClassification.id)
	@JoinColumn({ name: 'revisedclassificationid', referencedColumnName: 'id' })
	revisedClassification: IExamDetectionClassification;

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

	@Column({ type: 'float', name: 'bboxx0' })
	bboxX0: number;

	@Column({ type: 'float', name: 'bboxx1' })
	bboxX1: number;

	@Column({ type: 'float', name: 'bboxy0' })
	bboxY0: number;

	@Column({ type: 'float', name: 'bboxy1' })
	bboxY1: number;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;
}