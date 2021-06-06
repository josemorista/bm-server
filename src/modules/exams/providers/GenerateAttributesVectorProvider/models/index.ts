
export interface IGenerateAttributesVectorDTO {
	dcmPath: string;
	outDirectoryPath: string;
}

export interface IGenerateAttributeVectorResponseDTO {
	originalImagePath: string;
	attributesCsvPath: string;
	pixelArea: number;
	dicomPatientId: string;
	rows: number;
	cols: number;
}

export interface IGenerateAttributesVectorProvider {
	generate(data: IGenerateAttributesVectorDTO): Promise<IGenerateAttributeVectorResponseDTO>;
}