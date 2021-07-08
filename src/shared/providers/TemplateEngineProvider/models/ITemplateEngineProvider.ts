
export interface ITemplateEngineRenderDTO {
	templatePath: string;
	context: Record<string, unknown>;
}

export interface ITemplateEngineProvider {
	render(data: ITemplateEngineRenderDTO): Promise<string>;
}