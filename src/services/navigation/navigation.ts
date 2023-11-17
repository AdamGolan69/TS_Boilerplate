import { Contact } from "../../app/pages/contact-us/contact-us";
import { Home } from "../../app/pages/home/home";

export class Navigation {
    pages: {[k: string]: any} = {
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
    constructor() {
        console.log(navigator);
        console.log(location);
    }

    getPage() {
        return this.pages[this.pathname.toLocaleLowerCase()] ?? Home;
    }
}