import { ModuleBase, ModuleDecorator } from "@decorators";

@ModuleDecorator
export class JoinUs extends ModuleBase {
    init() {
        console.log('Join us section');
        return this;
    }
}