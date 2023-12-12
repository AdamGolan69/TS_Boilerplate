import { State } from "../services";
import { Enlist, PageBlockBase } from "./base";

export function ModuleDecorator(target: CustomElementConstructor) {
    Enlist('module', target);
}

export abstract class ModuleBase extends PageBlockBase {
    moduleState = new State();
}