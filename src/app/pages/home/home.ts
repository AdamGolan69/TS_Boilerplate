import { PageBase, PageDecorator } from "@decorators";
import { Header } from "./header/header";
import { JoinUs } from "./join-us/join-us";
import { StateKeys } from "@services/state/config";

@PageDecorator
export class Home extends PageBase {
    header = new Header();
    joinUs = new JoinUs();
    init() {
        console.log('Welcome home');
        this.append(this.header, this.joinUs);
        setTimeout(()=> this.appState.publish(StateKeys.pageContentLoaded), 1000);
    }
}