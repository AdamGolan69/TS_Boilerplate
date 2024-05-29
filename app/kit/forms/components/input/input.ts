import { ComponentDecorator } from "@decorators";
import { FormComponentBase } from "../base";
import { IInputProps } from "../../interfaces/props";

@ComponentDecorator
export class Input extends FormComponentBase<IInputProps> {

    protected createMe() {
        const [para, label, inp] = this.createFormGroup('input');
        para.append(label, inp);
        // Implement Paragraph.
        if (this.props.dataset) Object.entries(this.props.dataset).forEach(([key, value]) => para.dataset[key] = value);
        if (typeof this.props.required === 'boolean') para.dataset.required = `${this.props.required}`;
        // Implement Label.
        if (this.props.label?.length) label.innerText = this.props.label;
        // Implement Input.
        inp.innerText = this.props.text;
        inp.type = this.props.type ?? 'text';
        if (this.props.pattern) inp.pattern = this.props.pattern;
        if (typeof this.props.required === 'boolean') inp.required = this.props.required;
        if (this.props.placeholder?.length) inp.placeholder = this.props.placeholder;
        if (this.props.value) inp.value = this.props.value;
        inp.oninput = () => this.onInput(inp.value);
        return para;
    }
}