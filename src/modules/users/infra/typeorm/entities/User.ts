import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IUser } from '../../../entities/models/IUser';
import { Exclude, Expose } from 'class-transformer';

import { getStorageAttributeFromDiskOrS3 } from '../../../../../shared/utils/getStorageAttributeFromDiskOrS3';

@Entity('users')
export class User implements IUser {

	@PrimaryColumn({ type: 'varchar', name: 'id' })
	id: string;

	@Column({ type: 'varchar', name: 'firstname' })
	firstName: string;

	@Column({ type: 'varchar', name: 'lastname' })
	lastName: string;

	@Column({ type: 'varchar', nullable: true })
	job: string | null;

	@Column({ type: 'varchar', nullable: true, name: 'relatedinstitution' })
	relatedInstitution: string | null;

	@Exclude()
	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar' })
	email: string;

	@Column({ type: 'varchar', nullable: true })
	avatar: string | null;

	avatarURL: string | null;

	@Expose({ name: 'avatarUrl' })
	getAvatarUrl(): string | null {
		return getStorageAttributeFromDiskOrS3(this.avatar);
	}

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;

}