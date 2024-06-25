import { ComponentDecorator } from "@decorators";
import { FormComponentBase } from "../base";
import { ITextareaProps } from "../../interfaces/props";

@ComponentDecorator
export class Textarea extends FormComponentBase<ITextareaProps> {
    declare field: HTMLTextAreaElement;
    protected createMe() {
        const [para, label, inp] = this.createFormGroup('textarea');
        // Implement Paragraph.
        if (this.props.dataset) Object.entries(this.props.dataset).forEach(([key, value]) => para.dataset[key] = value);
        if (typeof this.props.required === 'boolean') para.dataset.required = `${this.props.required}`;
        para.append(label, inp);
        if (this.props.error?.length) this.append(this.createError());
        // Implement Label.
        if (this.props.label?.length) label.innerText = label.htmlFor = inp.id = inp.name = this.props.label;
        // Implement Input.
        this.reset();
        inp.oninput = () => this.onInput(inp.value);
        return para;
    }

    reset(): void {
        super.reset();
        if (this.props.placeholder?.length) this.field.placeholder = this.props.placeholder;
    }
}