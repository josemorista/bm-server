
export interface IApplyMedianFilterDTO {
	imgPath: string;
	outImgPath: string;
	size: number;
}

export interface IMedianDenoiseProvider {
	applyMedianFilter(data: IApplyMedianFilterDTO): Promise<void>;
}