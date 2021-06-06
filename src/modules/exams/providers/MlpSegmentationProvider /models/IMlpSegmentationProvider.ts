
export interface IMlpApplyModelDTO {
	csvPath: string;
	outDirectoryPath: string;
	proba: number;
	shape: [number, number];
}

export interface IMlpProviderResponseDTO {
	resultImagePath: string;
	edgeImagePath: string;
}

export interface IMlpSegmentationProvider {
	applyModel(data: IMlpApplyModelDTO): Promise<IMlpProviderResponseDTO>;
}