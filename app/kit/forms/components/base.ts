import { ComponentBase } from "@decorators";
import { Props } from "../interfaces/props/base";

export abstract class FormComponentBase<M extends Props = Props> extends ComponentBase<any> {
    value: string;

    constructor(public props: M) {
        super();
    }

    protected init(): void {
        this.append(this.createMe());
    }

    protected abstract createMe(): HTMLParagraphElement;

    protected createFormGroup(inpType: 'input'): [HTMLParagraphElement, HTMLLabelElement, HTMLInputElement];
    protected createFormGroup(inpType: 'textarea'): [HTMLParagraphElement, HTMLLabelElement, HTMLTextAreaElement];
    protected createFormGroup(inpType: 'select'): [HTMLParagraphElement, HTMLLabelElement, HTMLSelectElement];
    protected createFormGroup(inpType: 'input' | 'textarea' | 'select'): [HTMLParagraphElement, HTMLLabelElement, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement] {
        const
            para = this.cElem('p'),
            label = this.cElem('label'),
            inp = this.cElem(inpType);
        para.className = label.className = inp.className = 'form-';
        para.className += 'group';
        label.className += 'label';
        inp.className += 'field';
        return [para, label, inp];
    }

    protected onInput(value: string): void {
        this.value = value;
    }
}