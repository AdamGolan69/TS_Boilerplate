export function Enlist<T extends CustomElementConstructor>(type: 'page' | 'module' | 'component', target: T) {
    customElements.define(`${target.name.toLowerCase()}-${type}`, target);
}

export abstract class Base<IText = any> extends HTMLElement {
    texts: IText;
    constructor() {
        super();
        setTimeout(() => this.init());
    }

    protected abstract init(): void;

    // Create element.
    protected cElem<K extends keyof HTMLElementTagNameMap>(name: K): HTMLElementTagNameMap[K] {
        return document.createElement(name);
    }

    // Get element -> Id.
    protected giElem(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    // Get element -> Class.
    protected gcElem(className: string): HTMLCollectionOf<Element>{
        return document.getElementsByClassName(className);
    }

    // Get element -> Name.
    protected gnElem(name: string): NodeListOf<HTMLElement> {
        return document.getElementsByName(name);
    }

    // Get element -> Tag.
    protected gtElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
        return document.getElementsByTagName(tag);
    }
}

export abstract class PageBlockBase<IText> extends Base<IText> {
    constructor() {
        super();
        this.classList.add(this.constructor.name.toLowerCase());
    }
}