
export interface IApplySobelDTO {
	imgPath: string;
	outImgPath: string;
}

export interface ISobelEdgeFilterProvider {
	applySobel(data: IApplySobelDTO): Promise<void>;
}