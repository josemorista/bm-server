import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { getStorageAttributeFromDiskOrS3 } from '../../../../../shared/utils/getStorageAttributeFromDiskOrS3';
import { IPatient } from '../../../../patients/entities/models/IPatient';
import { Patient } from '../../../../patients/infra/typeorm/entities/Patient';
import { IExam } from '../../../entities/models/IExam';

@Entity('exams')
export class Exam implements IExam {
	@PrimaryColumn({ type: 'varchar' })
	id: string;

	@Column({ type: 'varchar' })
	label: string;

	@Column({ type: 'varchar', name: 'patientid' })
	patientId: string;

	@Column({ type: 'float', name: 'pixelarea', nullable: true })
	pixelArea: number | null;

	@Column({ type: 'timestamp' })
	date: string | Date;

	@Column({ type: 'enum', enum: ['ant', 'post', 'cra'] })
	category: IExam['category'];

	@Column({ type: 'varchar', name: 'dicomfilelocation' })
	dicomFileLocation: string;

	@Column({ type: 'varchar', name: 'originalimagelocation', nullable: true })
	originalImageLocation: string;

	@Column({ type: 'varchar', name: 'resultimagelocation', nullable: true })
	resultImageLocation: string;

	@Column({ type: 'varchar', name: 'edgedresultimagelocation', nullable: true })
	edgedResultImageLocation: string;

	@Column({ type: 'varchar', name: 'overlayimagelocation', nullable: true })
	overlayImageLocation: string;


	@Expose({
		name: 'originalImageURL'
	})
	getOriginalImageURL(): string | null {
		return getStorageAttributeFromDiskOrS3(this.originalImageLocation);
	}

	@Expose({
		name: 'resultImageURL'
	})
	getResultImageURL(): string | null {
		return getStorageAttributeFromDiskOrS3(this.resultImageLocation);
	}

	@Expose({
		name: 'edgedResultImageURL'
	})
	getEdgedResultImageURLL(): string | null {
		return getStorageAttributeFromDiskOrS3(this.edgedResultImageLocation);
	}

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;

	@ManyToOne(() => Patient)
	@JoinColumn({ name: 'patientid', referencedColumnName: 'id' })
	patient: IPatient;
}