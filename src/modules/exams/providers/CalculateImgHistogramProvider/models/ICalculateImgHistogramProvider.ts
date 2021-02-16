
export interface ICalculateImgHistogramDTO {
	imgPath: string;
	outImgPath: string;
	bins: number;
	range: Array<number>;
}

export interface ICalculateImgHistogramProvider {
	calculateImgHistogram(data: ICalculateImgHistogramDTO): Promise<void>
}