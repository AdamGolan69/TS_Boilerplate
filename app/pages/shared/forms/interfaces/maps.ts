import { IInputElement, ITextareaElement, ISelectElement } from "./props";

export interface IFormMap {
    [name: string]: IInputElement | ITextareaElement | ISelectElement;
    // @ts-ignore
    legend?: string;
}

export type IFormBtns = {
    type: "submit" | "reset" | "button";
    text: string;
    cb?: (query: { [name: string]: string }) => void;
}[];