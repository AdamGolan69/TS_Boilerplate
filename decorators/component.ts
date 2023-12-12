import { PageBlockBase, Enlist } from "./base";

export function ComponentDecorator(target: CustomElementConstructor) {
    Enlist('component', target);
}

export abstract class ComponentBase<T = any> extends PageBlockBase {
    localData: T;
}