export interface IApplyRandomWalkerDTO {
	imgPath: string;
	outImgPath: string;
	markers: Array<number>;
	beta: number;
}

export interface IRandomWalkerSegmentationProvider {
	applyRandomWalker(data: IApplyRandomWalkerDTO): Promise<void>;
}