import { PageBase, PageDecorator } from "@decorators";
import { Header } from "./header/header";
import { JoinUs } from "./join-us/join-us";
import { StateKeys } from "@services/state/config";
import { home } from "@i18n/en/home/home";

@PageDecorator
export class Home extends PageBase<typeof home> {
    header = new Header();
    joinUs = new JoinUs();
    protected async init() {
        console.log('Welcome home');
        this.append(this.header, this.joinUs);
        setTimeout(()=> this.appState.publish(StateKeys.pageContentLoaded), 1000);
    }
}