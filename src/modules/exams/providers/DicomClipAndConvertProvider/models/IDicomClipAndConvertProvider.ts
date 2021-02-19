
export interface IDicomClipAndConvertToImgDTO {
	filePath: string;
	outFilePath: string;
	maxDicomValue: number;
}

export interface IClipAndConvertToImgResponse {
	patientId: string;
	pixelArea: number;
}
export interface IDicomClipAndConvertProvider {
	clipAndConvertToImg(data: IDicomClipAndConvertToImgDTO): Promise<IClipAndConvertToImgResponse>;
}