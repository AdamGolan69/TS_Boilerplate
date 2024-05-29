import { ModuleBase, ModuleDecorator } from "@decorators";
import { IFormMap } from "./interfaces/maps";
import { Input, Select, Textarea } from "./components";
import { API } from "@services/API/API";

@ModuleDecorator
export class Form extends ModuleBase {
    query: { [name: string]: string } = {};
    proxy = new API();
    constructor(private map: IFormMap) {
        super();
    }
    protected init(): void {
        const form = this.cElem('form');
        form.append(...Object.entries(this.map).map(([name, obj]) => {
            let field: Input | Select | Textarea;
            switch (obj.type) {
                case 'input':
                    field = new Input(obj.props);
                    break;
                case 'select':
                    field = new Select(obj.props);
                    break;
                case 'textarea':
                    field = new Textarea(obj.props);
                    break;
            }
            this.query[name] = field.value;
            return field;
        }));
        this.append(form);
    }

    request<Response = any>(action: string, method: keyof API = 'POST'): Promise<Response> {
        return this.proxy[method](action, JSON.stringify(this.query));
    }
}