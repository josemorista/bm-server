
export interface IRandomForestApplyModelDTO {
	csvPath: string;
	outDirectoryPath: string;
	proba: number;
	shape: [number, number];
}

export interface IRandomForestSegmentationProviderResponseDTO {
	resultImagePath: string;
	edgeImagePath: string;
}

export interface IRandomForestSegmentationProvider {
	applyModel(data: IRandomForestApplyModelDTO): Promise<IRandomForestSegmentationProviderResponseDTO>;
}