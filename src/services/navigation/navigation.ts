import { Contact } from "@app/pages/contact-us/contact-us";
import { Home } from "@app/pages/home/home";

export class Navigation {
    pages: { [k: string]: typeof HTMLElement } = {
        '/': Home,
        '/home': Home,
        '/contact-us': Contact,
    };
    get origin() {
        return location.origin;
    }
    get href() {
        return `${this.origin}/`;
    }
    get pathname() {
        return location.pathname;
    }
    get port() {
        return location.port;
    }
    get protocol() {
        return location.protocol;
    }

    getPage(page = this.pathname.toLocaleLowerCase()): typeof HTMLElement {
        return this.pages[page] ?? Home;
    }

    getClickedPage(page: string): typeof HTMLElement {
        window.history.pushState(null, '', page);
        return this.getPage(page);
    }
}