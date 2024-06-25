import { ModuleBase, ModuleDecorator } from "@decorators";
import { IFormMap, IFormBtns } from "./interfaces/maps";
import { Input, Select, Textarea } from "./components";
import { API } from "@services/API/API";
import { FormComponentBase } from "./components/base";

@ModuleDecorator
export class Form extends ModuleBase {
    query: { [name: string]: string } = {};
    proxy = new API();
    fields: FormComponentBase[] = [];
    appBtns: HTMLButtonElement[] = [];
    submitable: boolean = false;
    constructor(private map: IFormMap, private btns: IFormBtns) {
        super();
    }
    protected init(): void {
        this.innerHTML = '';
        const legend = this.createLegend();
        const btns = this.createBtns();
        if (!this.fields.length) this.createFields();
        this.append(legend, ...this.fields, btns);
    }

    private createLegend(): HTMLLegendElement | string {
        if (this.map.legend?.length) {
            const legend = this.cElem('legend');
            legend.innerText = this.map.legend;
            delete this.map.legend;
            return legend;
        } else return '';
    }

    private createFields(): (Input | Select | Textarea)[] {
        return this.fields = Object.entries(this.map).map(([name, obj]) => {
            let field: Input | Select | Textarea;
            switch (obj.type) {
                case 'input':
                    field = new Input(obj.props);
                    if (obj.props.multiplyBy?.length) this.multiply(obj.props.multiplyBy, field);
                    break;
                case 'select':
                    field = new Select(obj.props);
                    break;
                case 'textarea':
                    field = new Textarea(obj.props);
                    break;
            }
            field.addEventListener('input', () => { this.query[name] = `${field.value} ${obj.props.dataset?.unit ?? ''}`; this.checkForm(); });
            return field;
        });
    }

    private createBtns(): HTMLDivElement {
        const wrapper = this.cElem('div');
        const baseCls = 'form-';
        wrapper.className = `${baseCls}btns`
        wrapper.append(...this.btns.map((props) => {
            const btn = this.cElem('button');
            btn.className = `${baseCls}${props.text}`;
            btn.innerText = props.text;
            btn.type = props.type;
            if (btn.type === 'reset') {
                btn.onclick = () => this.resetForm();
            } else {
                btn.onclick = () => props.cb ? props.cb(this.query) : null;
                btn.disabled = !this.submitable;
                this.appBtns.push(btn);
            }
            return btn;
        }));
        return wrapper;
    }

    resetForm(): void {
        for (let field of this.fields) field.reset();
        this.checkForm();
    }

    private multiply(id: string, toClone: Input): void {
        setTimeout(() => {
            const ref = this.fields.find(field => field.props.label === id);
            ref?.addEventListener('input', () => {
                if (!ref?.value) return;
                let idx = -1
                const amount = this.fields.filter((field, i) => {
                    if (field.props.label === toClone.props.label) {
                        if (idx === -1) idx = i;
                        return field;
                    }
                }).length;
                const toPush = [];
                for (let ctx = 1; ctx <= +ref?.value; ctx++) {
                    const props = structuredClone(toClone.props);
                    if (props.label?.length) props.label += ` ${ctx}`;
                    const field = new Input(props);
                    field.onchange = () => { this.query[`${props.text}${ctx}`] = `${field.value} ${props.dataset?.unit ?? ''}`; this.checkForm(); };
                    toPush.push(field);
                }
                this.fields.splice(idx, amount, ...toPush);
                this.init();
                this.fields[0].focus();
            });
        }, 0);
    }

    checkForm(): void {
        const boolArr: boolean[] = [];
        for (const field of this.fields) boolArr.push(field.hasError);
        this.submitable = !!boolArr.every(a => !a);
        for (const btn of this.appBtns) btn.disabled = !this.submitable;
    }

    request<Response = any>(action: string, method: keyof API = 'POST'): Promise<Response> {
        return this.proxy[method](action, JSON.stringify(this.query));
    }
}