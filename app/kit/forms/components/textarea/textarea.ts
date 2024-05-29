import { ComponentDecorator } from "@decorators";
import { FormComponentBase } from "../base";
import { ITextareaProps } from "../../interfaces/props";

@ComponentDecorator
export class Textarea extends FormComponentBase<ITextareaProps> {

    protected createMe() {
        const [para, label, inp] = this.createFormGroup('textarea');
        para.append(label, inp);
        // Implement Paragraph.
        if (this.props.dataset) Object.entries(this.props.dataset).forEach(([key, value]) => para.dataset[key] = value);
        // Implement Label.
        if (this.props.label?.length) label.innerText = this.props.label;
        // Implement Input.
        if (typeof this.props.required === 'boolean') inp.required = this.props.required;
        if (this.props.placeholder?.length) inp.placeholder = this.props.placeholder;
        inp.oninput = () => this.onInput(inp.value);
        return para;
    }
}