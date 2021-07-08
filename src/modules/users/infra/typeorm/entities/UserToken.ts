import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IUserToken } from '../../../entities/models/IUserToken';

@Entity('userstokens')
export class UserToken implements IUserToken {

	@PrimaryColumn({ type: 'varchar', name: 'token' })
	token: string;

	@Column({ type: 'varchar', name: 'userid' })
	userId: string;

	@Column({ type: 'timestamp', name: 'expiresat' })
	expiresAt: string | Date;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: string | Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: string | Date;

}