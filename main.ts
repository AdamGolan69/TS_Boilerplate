import { Device, Language, Navigation, State } from "@services";
import { Navbar } from "@app/kit/link-based/navbar/navbar";
import { StateKeys } from "@services/state/config";
import { Loader } from "@app/kit/loader/lodaer";
import { PageBase } from "@decorators";

import './style/dist/style.css';

class Main {
  app = document.getElementById('app') ?? this.createApp();
  loader = new Loader();
  device = new Device();
  appState = new State();
  navigation = new Navigation();
  i18n = new Language();
  loadingPage: PageBase<any>;
  constructor() {
    this.init();
  }

  private createApp(): HTMLDivElement {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.replaceChildren(app);
    return app;
  }

  private init() {
    this.appState.setData(StateKeys.lang, this.i18n);
    this.appState.setData(StateKeys.nav, this.navigation);
    document.body.prepend(new Navbar(this.appState));
    this.loadIt();
    this.subscribes();
  }

  private loadIt(): void {
    this.app?.replaceChildren(this.loader);
    this.loadingPage = new (this.navigation.getPage() as any)(this.appState);
  }

  private stateNavigate(page: string): void {
    if (this.navigation.pathname.includes(page)) return;
    this.navigation.getClickedPage(page);
    this.loadIt();
  }

  private loadPage(): void {
    this.app?.replaceChildren(this.loadingPage);
  }

  private subscribes(): void {
    window.addEventListener('popstate', () => this.loadIt());
    this.appState.subscribe(StateKeys.stateNavigate, this.stateNavigate.bind(this));
    this.appState.subscribe(StateKeys.pageContentLoaded, this.loadPage.bind(this));
    this.appState.subscribe(StateKeys.openModal, this.openModal.bind(this));
  }

  private openModal(inner: any): void {
    const dialog = document.createElement('dialog');
    const closeBtn = document.createElement('span');
    const closeModal = () => {
      dialog.close();
      this.app?.removeChild(dialog);
    }
    closeBtn.className = 'close';
    closeBtn.onclick = () => closeModal();
    dialog.className = 'modal';
    dialog.append(inner);
    dialog.onclick = ({ clientX, clientY }) => {
      const { top, left, width, height } = dialog.getBoundingClientRect();
      const isInDialog = (top <= clientY && clientY <= top + height && left <= clientX && clientX <= left + width);
      if (!isInDialog) closeModal();
    }
    dialog.append(closeBtn);
    this.app?.append(dialog);
    dialog.showModal();
  }
}

new Main();