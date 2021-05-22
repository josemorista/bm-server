
export interface IGenerateOverlayImageDTO {
	originalImagePath: string;
	edgeImagePath: string;
	outDirPath: string;
}

export interface IGenerateOverlayImageProvider {
	apply(data: IGenerateOverlayImageDTO): Promise<string>;
}