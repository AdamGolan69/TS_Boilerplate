import { State } from "../services";
import { Base, Enlist } from "./base";

export function PageDecorator(target: CustomElementConstructor) {
    Enlist('page', target);
}

export abstract class PageBase extends Base {
    pageState = new State();
    constructor() {
        super();
        this.id = this.constructor.name.toLowerCase();
    }
}