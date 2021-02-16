import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IUser } from '../../../../users/entities/models/IUser';
import { User } from '../../../../users/infra/typeorm/entities/User';
import { IPatient } from '../../../entities/models/IPatient';

@Entity('patients')
export class Patient implements IPatient {
	@PrimaryColumn({ type: 'varchar' })
	id: string;

	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'timestamp', name: 'birthdate', nullable: true })
	birthDate: Date | null;

	@Column({ type: 'varchar' })
	sex: 'M' | 'F';

	@Column({ type: 'varchar' })
	observations: string;

	@Column({ type: 'boolean', name: 'previousbonelesions', nullable: true })
	previousBoneLesions: boolean | null;

	@Column({ type: 'boolean', name: 'previouscancerdiagnosis', nullable: true })
	previousCancerDiagnosis: boolean | null;

	@Column({ type: 'varchar', name: 'previouscancerdiagnosistype' })
	previousCancerDiagnosisType?: string;

	@Column({ type: 'varchar', name: 'ownerid' })
	ownerId: string;

	@ManyToOne(() => User)
	@JoinColumn({ referencedColumnName: 'id', name: 'ownerid' })
	owner?: IUser;

	@Column({ type: 'boolean', name: 'previousqt', nullable: true })
	previousQt: boolean | null;

	@Column({ type: 'boolean', name: 'previousrt', nullable: true })
	previousRt: boolean | null;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;
}