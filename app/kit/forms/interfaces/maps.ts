import { IInputElement, ITextareaElement, ISelectElement } from "./props";

export interface IFormMap {
    [name: string]: IInputElement | ITextareaElement | ISelectElement;
}