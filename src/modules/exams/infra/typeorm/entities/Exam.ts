import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IPatient } from '../../../../patients/entities/models/IPatient';
import { Patient } from '../../../../patients/infra/typeorm/entities/Patient';
import { IExam } from '../../../entities/models/IExam';
import { Expose } from 'class-transformer';
import { uploadConfig } from '../../../../../config/upload';

@Entity('exams')
export class Exam implements IExam {

	@PrimaryColumn({ type: 'varchar' })
	id: string;

	@Column({ type: 'varchar' })
	label: string;

	@Column({ type: 'varchar', name: 'patientid' })
	patientId: string;

	@Column({ type: 'varchar' })
	category: IExam['category']

	@Column({ type: 'smallint', name: 'maxdicomvalue' })
	maxDicomValue: number;

	@Column({ type: 'smallint', name: 'currentstep' })
	currentStep: number;

	@Column({ type: 'varchar', name: 'denoisefilter' })
	denoiseFilter: IExam['denoiseFilter'];

	@Column({ type: 'varchar', name: 'histogramequalization' })
	histogramEqualization: IExam['histogramEqualization'];

	@Column({ type: 'varchar', name: 'edgefilter' })
	edgeFilter: IExam['edgeFilter'];

	@Column({ type: 'varchar', name: 'segmentationmethod' })
	segmentationMethod: IExam['segmentationMethod'];

	@Column({ type: 'varchar', name: 'processedimglocation' })
	processedImgLocation: IExam['processedImgLocation'];

	@Expose({ name: 'processedImgLocationURL' })
	processedImgLocationURL(): string {
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.processedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'originalimglocation' })
	originalImgLocation: string;

	@Expose({ name: 'originalImgLocationURL' })
	originalImgLocationURL(): string {
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.originalImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'dicomfilelocation' })
	dicomFileLocation: string;

	@CreateDateColumn({ name: 'createdat' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedat' })
	updatedAt: Date;

	@ManyToOne(() => Patient)
	@JoinColumn({ name: 'patientid', referencedColumnName: 'id' })
	patient: IPatient;

}