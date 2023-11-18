import { ModuleBase, ModuleDecorator } from "@decorators";
import { State } from "@services/state/state";
import { StateKeys } from "@services/state/config";
import { ILink } from "./intefaces/config";

@ModuleDecorator
export class Navbar extends ModuleBase {
    links: ILink[] = [
        { href: '/home', text: 'home' },
        { href: '/contact-us', text: 'contact us' },
    ];
    linksList = document.createElement('ul');
    constructor(private appState: State) {
        super();
    }
    protected init() {
        this.createLinks();
        this.append(this.linksList);
    }

    private createLinks() {
        this.links.forEach(link => {
            const li = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.innerHTML = link.text;
            anchor.href = link.href;
            anchor.onclick = (e) => this.navigate(e, link.href);
            li.append(anchor);
            if (link.title) li.title = link.title;
            if (link.img?.length) {
                const img = document.createElement('img');
                img.alt = '...';
                img.src = link.img;
                li.append(img);
            }
            this.linksList.append(li);
        })
    }

    private navigate(e: MouseEvent, href: string) {
        e.preventDefault();
        this.appState.publish(StateKeys.stateNavigate, href);
    }
}