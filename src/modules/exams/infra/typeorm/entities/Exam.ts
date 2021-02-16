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

	@Column({ type: 'varchar', name: 'denoisefilter', nullable: true })
	denoiseFilter: IExam['denoiseFilter'];

	@Column({ type: 'varchar', name: 'histogramequalization', nullable: true })
	histogramEqualization: IExam['histogramEqualization'];

	@Column({ type: 'varchar', name: 'edgefilter', nullable: true })
	edgeFilter: IExam['edgeFilter'];

	@Column({ type: 'varchar', name: 'segmentationmethod', nullable: true })
	segmentationMethod: IExam['segmentationMethod'];

	@Column({ type: 'varchar', name: 'denoisedimglocation', nullable: true })
	denoisedImgLocation: IExam['denoisedImgLocation'];

	@Expose({ name: 'denoisedImgLocationURL' })
	denoisedImgLocationURL(): string | null {
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.denoisedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'equalizedimglocation', nullable: true })
	equalizedImgLocation: string | null;

	@Expose({ name: 'equalizedImgLocationURL' })
	equalizedImgLocationURL(): string | null {
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.equalizedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'segmentedimglocation', nullable: true })
	segmentedImgLocation: IExam['segmentedImgLocation'];

	@Expose({ name: 'segmentedImgLocationURL' })
	segmentedImgLocationURL(): string | null {
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.segmentedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'edgedimglocation', nullable: true })
	edgedImgLocation: IExam['edgedImgLocation'];

	@Expose({ name: 'edgedImgLocationURL' })
	edgedImgLocationURL(): string | null {
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.edgedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'originalimglocation', nullable: true })
	originalImgLocation: string | null;

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