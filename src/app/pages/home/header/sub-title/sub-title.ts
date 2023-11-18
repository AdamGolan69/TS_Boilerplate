import { ComponentBase, ComponentDecorator } from "@decorators";

@ComponentDecorator
export class SubTitle extends ComponentBase {
    init() {
        console.log('Sub title');
    }
}