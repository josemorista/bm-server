import hbs from 'handlebars';
import { ITemplateEngineProvider, ITemplateEngineRenderDTO } from '../models/ITemplateEngineProvider';
import fs from 'fs/promises';

export class HandleBarsTemplateEngineProvider implements ITemplateEngineProvider {

	async render(data: ITemplateEngineRenderDTO): Promise<string> {
		const content = await fs.readFile(data.templatePath, {
			encoding: 'utf-8'
		});
		return hbs.compile(content)(data.context);
	}

}