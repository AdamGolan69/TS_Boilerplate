import { PageBase, PageDecorator } from "@decorators";
import { contact } from "@i18n/en/contact/contact";
import { StateKeys } from "@services/state/config";

@PageDecorator
export class Contact extends PageBase<typeof contact> {
    protected async init() {
        console.log('Contact us');
        setTimeout(()=> this.appState.publish(StateKeys.pageContentLoaded), 1000);
    }
}