import { State } from "../services";
import { Enlist, PageBlockBase } from "./base";

export function ModuleDecorator(target: CustomElementConstructor) {
    Enlist('module', target);
}

export abstract class ModuleBase<IText = any> extends PageBlockBase<IText> {
    moduleState = new State();

    constructor() {
        super();
        this.dataset.type = 'module';
    }
}