import { PageBlockBase, Enlist } from "./base";

export function ComponentDecorator(target: CustomElementConstructor) {
    Enlist('component', target);
}

export abstract class ComponentBase<IText> extends PageBlockBase<IText> {
    constructor() {
        super();
        this.dataset.type = 'component';
    }
}