import { ComponentBase, ComponentDecorator } from "@decorators";
import { State } from "@services";
import { StateKeys } from "@services/state/config";

@ComponentDecorator
export class Adder extends ComponentBase<{}> {
    constructor(protected appState: State) {
        super();
        
    }
    protected init(): void {
        this.id = 'adder';
        this.onclick = () => this.appState.publish(StateKeys.openModal, 'Open new adder.');
    }
}