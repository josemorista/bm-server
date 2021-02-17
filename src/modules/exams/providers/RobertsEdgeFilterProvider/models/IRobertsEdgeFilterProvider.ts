
export interface IApplyRobertsDTO {
	imgPath: string;
	outImgPath: string;
}

export interface IRobertsEdgeFilterProvider {
	applyRoberts(data: IApplyRobertsDTO): Promise<void>;
}