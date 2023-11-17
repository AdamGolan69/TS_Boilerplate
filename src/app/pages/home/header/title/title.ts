import { ComponentBase, ComponentDecorator } from "../../../../../decorators/component";

@ComponentDecorator
export class Title extends ComponentBase {
    init() {
        console.log('Title');
    }
}