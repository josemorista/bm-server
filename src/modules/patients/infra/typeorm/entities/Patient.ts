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
	birthDate: Date;

	@Column({ type: 'varchar' })
	sex: 'M' | 'F';

	@Column({ type: 'varchar' })
	observations: string;

	@Column({ type: 'boolean', name: 'previousbonelesions' })
	previousBoneLesions: boolean;

	@Column({ type: 'boolean', name: 'previouscancerdiagnosis' })
	previousCancerDiagnosis: boolean;

	@Column({ type: 'varchar', name: 'previouscancerdiagnosistype' })
	previousCancerDiagnosisType?: string;

	@Column({ type: 'varchar', name: 'ownerid' })
	ownerId: string;

	@ManyToOne(() => User)
	@JoinColumn({ referencedColumnName: 'id', name: 'ownerid' })
	owner?: IUser;

	@Column({ type: 'boolean', name: 'previousqt' })
	previousQt: boolean;

	@Column({ type: 'boolean', name: 'previousrt' })
	previousRt: boolean;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;
}