import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ISegmentedExam } from '../../../entities/models/ISegmentedExam';
import { Exam } from './Exam';

@Entity('segmentedexams')
export class SegmentedExam implements ISegmentedExam {

	@PrimaryColumn({ type: 'varchar', name: 'examid' })
	examId: string;

	@Column({
		type: 'enum', enum: [
			'randomForest',
			'SVM',
			'MLP',
			'naiveBayes'
		]
	})
	algorithm: 'randomForest' | 'SVM' | 'MLP' | 'naiveBayes';

	@OneToOne(() => Exam)
	@JoinColumn({ name: 'examid' })
	exam?: Exam;

	@Column({ type: 'float' })
	threshold: number;

	@Column({ name: 'affectedarea', type: 'float' })
	affectedArea: number;

	@Column({ name: 'classifiedarea', type: 'float' })
	classifiedArea: number;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: string | Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: string | Date;

}