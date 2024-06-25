import { Props } from "./base";

export interface IInputProps extends Props, Partial<Pick<HTMLInputElement, 'pattern' | 'value'>>, Pick<HTMLInputElement, 'type'> {
    text: string;
    multiplyBy?: string;
}

export interface IInputElement {
    type: 'input';
    props: IInputProps;
}