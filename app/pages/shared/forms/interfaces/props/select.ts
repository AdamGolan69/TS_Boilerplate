import { Props } from "./base";

export interface ISelectProps extends Props { 
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