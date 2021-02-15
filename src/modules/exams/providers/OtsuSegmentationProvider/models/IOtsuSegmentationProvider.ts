
export interface IApplyOtsuSegmentationDTO {
	imgPath: string;
	outImgPath: string;
}

export interface IOtsuSegmentationProvider {
	applyOtsuSegmentation(data: IApplyOtsuSegmentationDTO): Promise<void>;
}