import { ComponentBase, ComponentDecorator } from "../../../../../decorators/component";

@ComponentDecorator
export class SubTitle extends ComponentBase {
    init() {
        console.log('Sub title');
    }
}