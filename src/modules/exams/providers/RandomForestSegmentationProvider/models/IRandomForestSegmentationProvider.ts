
export interface IRandomForestApplyModelDTO {
	dcmPath: string;
	outDirectoryPath: string;
	proba: number;
}

export interface IRandomForestSegmentationProviderResponseDTO {
	originalImagePath: string;
	resultImagePath: string;
	edgeImagePath: string;
	pixelArea: number;
	dicomPatientId: string;
}

export interface IRandomForestSegmentationProvider {
	applyModel(data: IRandomForestApplyModelDTO): Promise<IRandomForestSegmentationProviderResponseDTO>;
}