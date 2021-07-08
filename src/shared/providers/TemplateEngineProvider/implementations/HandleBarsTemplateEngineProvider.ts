import hbs from 'handlebars';
import { ITemplateEngineProvider, ITemplateEngineRenderDTO } from '../models/ITemplateEngineProvider';

export class HandleBarsTemplateEngineProvider implements ITemplateEngineProvider {

	async render(data: ITemplateEngineRenderDTO): Promise<string> {
		return hbs.compile(data.templatePath)(data.context);
	}

}