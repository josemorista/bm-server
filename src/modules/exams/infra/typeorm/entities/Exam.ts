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

	@Column({ type: 'float', name: 'pixelarea' })
	pixelArea: number;

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
		if (!this.denoisedImgLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.denoisedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'equalizedimglocation', nullable: true })
	equalizedImgLocation: string | null;

	@Expose({ name: 'equalizedImgLocationURL' })
	equalizedImgLocationURL(): string | null {
		if (!this.equalizedImgLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.equalizedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'segmentedimglocation', nullable: true })
	segmentedImgLocation: IExam['segmentedImgLocation'];

	@Expose({ name: 'segmentedImgLocationURL' })
	segmentedImgLocationURL(): string | null {
		if (!this.segmentedImgLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.segmentedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'edgedimglocation', nullable: true })
	edgedImgLocation: IExam['edgedImgLocation'];

	@Expose({ name: 'edgedImgLocationURL' })
	edgedImgLocationURL(): string | null {
		if (!this.edgedImgLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.edgedImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'originalimghistogramlocation', nullable: true })
	originalImgHistogramLocation: IExam['originalImgHistogramLocation'];

	@Expose({ name: 'originalImgHistogramLocationURL' })
	originalImgHistogramLocationURL(): string | null {
		if (!this.originalImgHistogramLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.originalImgHistogramLocation}`;
	}

	@Column({ type: 'varchar', name: 'equalizedimghistogramlocation', nullable: true })
	equalizedImgHistogramLocation: IExam['equalizedImgHistogramLocation'];

	@Expose({ name: 'equalizedImgHistogramLocationURL' })
	equalizedImgHistogramLocationURL(): string | null {
		if (!this.equalizedImgHistogramLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.equalizedImgHistogramLocation}`;
	}

	@Column({ type: 'varchar', name: 'originalimglocation', nullable: true })
	originalImgLocation: string | null;

	@Expose({ name: 'originalImgLocationURL' })
	originalImgLocationURL(): string | null {
		if (!this.originalImgLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.originalImgLocation}`;
	}

	@Column({ type: 'varchar', name: 'resumesegmentationimglocation', nullable: true })
	resumeSegmentationImgLocation: string | null;

	@Expose({ name: 'resumeSegmentationImgLocationURL' })
	resumeSegmentationImgLocationURL(): string | null {
		if (!this.resumeSegmentationImgLocation) return null;
		return `${uploadConfig.diskStorageProviderConfig.publicUrl}/${this.resumeSegmentationImgLocation}`;
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