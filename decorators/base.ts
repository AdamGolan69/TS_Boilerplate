export function Enlist<T extends CustomElementConstructor>(type: 'page' | 'module' | 'component', target: T) {
    customElements.define(`${target.name.toLowerCase()}-${type}`, target);
}

export abstract class Base extends HTMLElement {
    constructor() {
        super();
        setTimeout(() => this.init(), 0);
    }

    protected abstract init(): void;
}

export abstract class PageBlockBase extends Base {
    constructor() {
        super();
        this.classList.add(this.constructor.name.toLowerCase());
    }
}