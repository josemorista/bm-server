
export interface IGenerateOverlayImageDTO {
	originalImagePath: string;
	resultImagePath: string;
	outDirPath: string;
}

export interface IGenerateOverlayImageProvider {
	apply(data: IGenerateOverlayImageDTO): Promise<string>;
}