import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ISegmentedExam } from '../../../entities/models/ISegmentedExam';

@Entity('segmentedexams')
export class SegmentedExam implements ISegmentedExam {

	@PrimaryColumn({ type: 'varchar', name: 'examid' })
	examId: string;

	@Column({
		type: 'enum', enum: [
			'randomForest',
			'SVM'
		]
	})
	algorithm: 'randomForest' | 'SVM';

	@Column({ type: 'float' })
	threshold: number;

	@CreateDateColumn()
	createdAt: string | Date;

	@UpdateDateColumn()
	updatedAt: string | Date;

}