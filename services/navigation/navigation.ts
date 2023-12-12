import { Contact } from "@app/pages/contact-us/contact-us";
import { Home } from "@app/pages/home/home";
import { PageBase } from "@decorators";

export class Navigation {
    pages: { [k: string]: typeof PageBase } = {
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

    getPage(): typeof PageBase {
        return this.pages[this.pathname.toLocaleLowerCase()] ?? Home;
    }

    getClickedPage(page: string): void {
        window.history.pushState(null, '', page);
    }
}