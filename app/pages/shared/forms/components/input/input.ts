import { ComponentDecorator } from "@decorators";
import { FormComponentBase } from "../base";
import { IInputProps } from "../../interfaces/props";

@ComponentDecorator
export class Input extends FormComponentBase<IInputProps> {
    declare field: HTMLInputElement;
    protected createMe() {
        const [para, label, inp] = this.createFormGroup('input');
        // Implement Paragraph.
        if (this.props.dataset) Object.entries(this.props.dataset).forEach(([key, value]) => para.dataset[key] = value);
        if (typeof this.props.required === 'boolean') para.dataset.required = `${this.props.required}`;
        para.append(label, inp);
        if (this.props.error?.length) this.append(this.createError());
        // Implement Label.
        if (this.props.label?.length) label.innerText = label.htmlFor = inp.id = inp.name = this.props.label;
        // Implement Input.
        inp.innerText = this.props.text;
        inp.type = this.props.type ?? 'text';
        if (this.props.pattern) inp.pattern = this.props.pattern;
        this.reset();
        if (this.props.value) inp.value = this.props.value;
        inp.oninput = () => this.onInput(inp.value = this.checkZero(inp.value));
        return para;
    }

    reset(): void {
        super.reset();
        if (this.props.placeholder?.length) this.field.placeholder = this.props.placeholder;
    }
    
    private checkZero(val: string): string {
        if (this.props.pattern !== '[0-9]') return val;
        return val[0] === '0' ? this.removeZero(val) : val;
    }

    private removeZero(val: string): string {
        val = val.slice(1);
        return val[0] === '0' ? this.removeZero(val) : val;
    }
}