import { ComponentDecorator } from "@decorators";
import { FormComponentBase } from "../base";
import { ISelectProps } from "../../interfaces/props";

@ComponentDecorator
export class Select extends FormComponentBase<ISelectProps> {
    declare field: HTMLSelectElement;
    protected createMe() {
        const [para, label, inp] = this.createFormGroup('select');
        // Implement Paragraph.
        if (this.props.dataset) Object.entries(this.props.dataset).forEach(([key, value]) => para.dataset[key] = value);
        if (typeof this.props.required === 'boolean') para.dataset.required = `${this.props.required}`;
        para.append(label, inp);
        if (this.props.error?.length) this.append(this.createError());
        // Implement Label.
        if (this.props.label?.length) label.innerText = label.htmlFor = inp.id = inp.name = this.props.label;
        // Implement Select.
        if (typeof this.props.required === 'boolean') inp.required = this.props.required;
        if (this.props.placeholder?.length) inp.innerHTML = `<option disabled selected>${this.props.placeholder}</option>`;
        inp.append(...this.props.options.map(opt=>{
            const option = this.cElem('option');
            option.innerText = opt.text;
            option.value = opt.value ?? opt.text;
            return option;
        }));
        inp.oninput = () => this.onInput(inp.value.toLowerCase());
        return para;
    }

    reset(): void {
        (this.field as HTMLSelectElement).selectedIndex = 0;
        super.reset();
    }
}