
export interface IDicomClipAndConvertToImgDTO {
	filePath: string;
	outFilePath: string;
	maxDicomValue: number;
}

export interface IDicomClipAndConvertProvider {
	clipAndConvertToImg(data: IDicomClipAndConvertToImgDTO): Promise<void>;
}