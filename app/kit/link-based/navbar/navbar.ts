import { Auth } from "@app/pages/shared/auth/auth";
import { LinkBased } from "../link-based";
import { ModuleDecorator } from "@decorators";
import { StateKeys } from "@services/state/config";

@ModuleDecorator
export class Navbar extends LinkBased {

    protected init() {
        this.createHamburger();
        this.createLogo();
        this.createLinks();
        this.createLogin();
        this.setActive();
        this.appState.subscribe(StateKeys.stateNavigate, this.setActive.bind(this));
    }

    private createHamburger(): void {
        const className = 'hamburger';
        const container = this.cElem('div');
        container.id = 'navbarHamburger';
        container.className = className;
        const hamburger = this.cElem('div');
        hamburger.className = `${className}-icon`;
        container.append(hamburger);
        this.append(container);
    }

    private createLogo(): void {
        const className = 'logo';
        const container = this.cElem('div');
        container.className = className;
        const anchor = this.cElem('a');
        anchor.className = `${className}-link`;
        anchor.href = '/';
        anchor.title = 'Home';
        anchor.onclick = (e) => {
            e.preventDefault();
            this.navigate(anchor.title);
        };
        container.append(anchor);
        this.append(container);
    }

    private createLogin(): void {
        const className = 'login';
        const container = this.cElem('div');
        container.className = className;
        const anchor = this.cElem('a');
        anchor.className = `${className}-button`;
        anchor.href = '/';
        anchor.innerText = 'Login';
        anchor.onclick = this.openLogin.bind(this);
        container.append(anchor);
        this.append(container);
    }

    private openLogin(e: MouseEvent): void {
        e.preventDefault();
        this.appState.publish(StateKeys.openModal, new Auth());
    }

    private setActive(): void {
        const path = this.appState.getData(StateKeys.nav).pathname.replace('/', '') || 'Home';
        Array.from(this.linksList.children).forEach(li => {
            const fn = (li.children[0] as HTMLAnchorElement).href.includes(encodeURI(path)) ? 'add' : 'remove';
            li.classList[fn]('active');
        });
    }
}