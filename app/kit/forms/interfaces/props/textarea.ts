import { Props } from "./base";

export interface ITextareaProps extends Props, Partial<Pick<HTMLTextAreaElement, 'required' | 'dataset'>> { }

export interface ITextareaElement {
    type: 'textarea';
    props: ITextareaProps;
}