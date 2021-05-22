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

	@Column({ type: 'varchar', nullable: true, name: 'dicompatientid' })
	dicomPatientId: string | null;

	@Column({ type: 'timestamp', name: 'birthdate', nullable: true })
	birthDate: Date | null;

	@Column({ type: 'varchar' })
	gender: 'M' | 'F';

	@Column({ type: 'varchar' })
	description: string;

	@Column({ type: 'varchar', name: 'ownerid' })
	ownerId: string;

	@ManyToOne(() => User)
	@JoinColumn({ referencedColumnName: 'id', name: 'ownerid' })
	owner?: IUser;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;
}