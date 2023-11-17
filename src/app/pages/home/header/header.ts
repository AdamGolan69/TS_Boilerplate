import { ModuleBase, ModuleDecorator } from "../../../../decorators/module";
import { SubTitle } from "./sub-title/sub-title";
import { Title } from "./title/title";

@ModuleDecorator
export class Header extends ModuleBase {
    titleElem = new Title();
    subTitleElem = new SubTitle();
    init() {
        console.log('Header section');
        this.append(this.titleElem, this.subTitleElem);
    }
}