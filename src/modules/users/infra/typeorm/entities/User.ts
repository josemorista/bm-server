import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IUser } from '../../../entities/models/IUser';
import { Exclude, Expose } from 'class-transformer';

import { uploadConfig } from '../../../../../config/upload';
import path from 'path';
import { env } from '../../../../../shared/env';

@Entity('users')
export class User implements IUser {

	@PrimaryColumn({ type: 'varchar', name: 'id' })
	id: string;

	@Column({ type: 'varchar', name: 'firstname' })
	firstName: string;

	@Column({ type: 'varchar', name: 'lastname' })
	lastName: string;

	@Exclude()
	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar' })
	email: string;

	@Column({ type: 'varchar', nullable: true })
	avatar: string | null;

	@Expose({ name: 'avatarUrl' })
	getAvatarUrl(): string | null {
		if (!this.avatar) return null;
		if (env.storageEngine === 'disk') return path.join(uploadConfig.diskStorageProviderConfig.publicUrl, this.avatar);
		return null;
	}

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;

}