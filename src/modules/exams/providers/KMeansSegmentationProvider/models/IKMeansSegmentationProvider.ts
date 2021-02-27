
export interface IApplyKMeansSegmentationDTO {
	imgPath: string;
	outImgPath: string;
	clusters: number;
}

export interface IKMeansSegmentationProvider {
	applyKMeansSegmentation(data: IApplyKMeansSegmentationDTO): Promise<void>;
}