
export interface IApplyLocalOtsuSegmentationDTO {
	imgPath: string;
	outImgPath: string;
	diskSize: number;
}

export interface ILocalOtsuSegmentationProvider {
	applyLocalOtsuSegmentation(data: IApplyLocalOtsuSegmentationDTO): Promise<void>;
}