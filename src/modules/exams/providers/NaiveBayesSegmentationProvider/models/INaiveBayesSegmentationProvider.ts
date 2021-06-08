
export interface INaiveBayesApplyModelDTO {
	csvPath: string;
	outDirectoryPath: string;
	proba: number;
	shape: [number, number];
}

export interface INaiveBayesProviderResponseDTO {
	resultImagePath: string;
	edgeImagePath: string;
}

export interface INaiveBayesSegmentationProvider {
	applyModel(data: INaiveBayesApplyModelDTO): Promise<INaiveBayesProviderResponseDTO>;
}