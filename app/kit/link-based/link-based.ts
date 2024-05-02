import { ModuleBase } from "@decorators";
import { State } from "@services";
import { ILink } from "./intefaces/config";
import { StateKeys } from "@services/state/config";

export abstract class LinkBased<IText = any> extends ModuleBase<IText> {
    links: ILink[] = [];
    linksList = this.cElem('ul');
    constructor(protected appState: State) {
        super();
        this.links = Object.keys(this.appState.getData(StateKeys.nav).pages).map((key) => ({ href: key, text: key.replace('/', '') }));
    }

    protected createLinks(): void {
        this.linksList.className = 'links';
        this.links.forEach(link => {
            if (link.text.length) {
                const li = this.cElem('li');
                const anchor = this.cElem('a');
                anchor.innerHTML = link.text;
                anchor.href = link.href;
                anchor.onclick = (e) => e.preventDefault();
                li.className = 'link';
                li.onclick = () => this.navigate(link.href);
                li.append(anchor);
                if (link.title) li.title = link.title;
                if (link.img?.length) {
                    const img = this.cElem('img');
                    img.alt = '...';
                    img.src = link.img;
                    li.append(img);
                }
                this.linksList.append(li);
            }
        });
        this.append(this.linksList);
    }
    
    protected navigate(href: string): void {
        this.appState.publish(StateKeys.stateNavigate, href);
    }
}