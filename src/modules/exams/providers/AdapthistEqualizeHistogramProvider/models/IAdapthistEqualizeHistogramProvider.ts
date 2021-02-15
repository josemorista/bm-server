
export interface IApplyAdapthistEqualizationDTO {
	imgPath: string;
	outImgPath: string;
}

export interface IAdapthistEqualizeHistogramProvider {
	applyAdapthistHistogramEqualization(data: IApplyAdapthistEqualizationDTO): Promise<void>;
}