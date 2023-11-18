import { ComponentBase, ComponentDecorator } from "@decorators";

@ComponentDecorator
export class Title extends ComponentBase {
    init() {
        console.log('Title');
    }
}