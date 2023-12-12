import { PageBase, PageDecorator } from "@decorators";
import { StateKeys } from "@services/state/config";

@PageDecorator
export class Contact extends PageBase {
    init() {
        console.log('Contact us');
        setTimeout(()=> this.appState.publish(StateKeys.pageContentLoaded), 1000);
    }
}