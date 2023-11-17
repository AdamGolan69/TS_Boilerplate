import { PageBase, PageDecorator } from "../../../decorators/page";
import { Header } from "./header/header";
import { JoinUs } from "./join-us/join-us";

@PageDecorator
export class Home extends PageBase {
    header = new Header();
    joinUs = new JoinUs();
    init() {
        console.log('Welcome home');
        this.append(this.header, this.joinUs);
    }
}