import { StateKeys } from "@services/state/config";
import { State } from "../services";
import { Base, Enlist } from "./base";
import { Footer } from "@app/kit/link-based/footer/footer";
import { BasePageText } from "@i18n/interfaces/base/base";

export function PageDecorator(target: CustomElementConstructor) {
    Enlist('page', target);
}

export abstract class PageBase<IText extends BasePageText> extends Base<IText> {
    pageState = new State();
    footer: Footer;
    componentList: string[];

    constructor(protected appState: State) {
        super();
        this.id = this.constructor.name.toLowerCase();
        this.dataset.type = 'page';
        this.texts = this.appState.getData(StateKeys.lang).getPageTexts(this.id);
    }

    protected async init(): Promise<void> {
        this.componentList.forEach(key => (this[key as keyof Base] as Base).texts = this.texts[key.toUpperCase() as keyof IText]);
        this.setFooter();
        setTimeout(() => this.appState.publish(StateKeys.pageContentLoaded), 500);
        this.pageState.subscribe(StateKeys.stateNavigate, this.navigateTo.bind(this));
    }

    protected navigateTo(href: string): void {
        this.appState.publish(StateKeys.stateNavigate, href);
    }

    private setFooter(): void {
        this.footer = new Footer(this.appState);
        this.footer.texts = this.texts.FOOTER;
        this.append(this.footer);
    }
}