import { ComponentDecorator } from "@decorators";
import { FormComponentBase } from "../base";
import { ISelectProps } from "../../interfaces/props";

@ComponentDecorator
export class Select extends FormComponentBase<ISelectProps> {

    protected createMe() {
        const [para, label, inp] = this.createFormGroup('select');
        para.append(label, inp);
        // Implement Label.
        if (this.props.label?.length) label.innerText = this.props.label;
        // Implement Input.
        if (this.props.placeholder?.length) inp.append(`<option disabled selected>${this.props.placeholder}<option/>`);
        inp.append(...this.props.options.map(opt=>{
            const option = this.cElem('option');
            option.innerText = opt.text;
            option.value = opt.value ?? opt.text;
            return option;
        }));
        inp.oninput = () => this.onInput(inp.value.toLowerCase());
        return para;
    }
}