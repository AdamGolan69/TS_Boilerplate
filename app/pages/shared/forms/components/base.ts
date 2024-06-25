import { ComponentBase } from "@decorators";
import { Props } from "../interfaces/props/base";

export abstract class FormComponentBase<P extends Props = Props> extends ComponentBase<any> {
    value: string = '';
    field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    hasError: boolean = false;

    constructor(public props: P) {
        super();
        this.className = 'form-group';
    }

    protected init(): void {
        this.hasError = !!(this.props.required && this.props.error?.length);
        this.prepend(this.createMe());
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
        para.className += 'input';
        label.className += 'label';
        inp.className += 'field';
        this.field = inp;
        return [para, label, inp];
    }

    protected onInput(value: string): void {
        this.value = value;
        this.checkError();
    }

    protected createError(): HTMLParagraphElement {
        const para = this.cElem('p');
        para.innerText = `${this.props.error}`;
        para.className = 'form-output';
        return para;
    }

    checkError(): void {
        if (this.props.error?.length) {
            this.hasError = !!(this.props.required && this.props.error?.length && !this.value.length);
            this.gcElem('form-output')[0].classList[this.hasError ? 'add' : 'remove']('show');
        }
    }

    reset(): void {
        if (typeof this.props.required === 'boolean') this.field.required = this.props.required;
        this.field.value = '';
        this.hasError = !!(this.props.required && this.props.error?.length);
    }

    focus(): void {
        this.field?.focus();
    }
}