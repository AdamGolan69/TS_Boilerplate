import { Props } from "./base";

export interface IInputProps extends Props, Partial<Pick<HTMLInputElement, 'required' | 'pattern' | 'dataset' | 'value'>>, Pick<HTMLInputElement, 'type'> {
    text: string;
}

export interface IInputElement {
    type: 'input';
    props: IInputProps;
}