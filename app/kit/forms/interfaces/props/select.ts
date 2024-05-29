import { Props } from "./base";

export interface ISelectProps extends Props, Partial<Pick<HTMLSelectElement, 'required' | 'dataset'>> { 
    options: IOptionProps[];
}

export interface IOptionProps {
    text: string;
    value?: string;
}

export interface ISelectElement {
    type: 'select';
    props: ISelectProps;
}