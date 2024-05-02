import { Device, Language, Navigation, State } from "@services";
import { Navbar } from "@app/kit/link-based/navbar/navbar";
import { StateKeys } from "@services/state/config";
import { Loader } from "@app/kit/loader/lodaer";
import { PageBase } from "@decorators";

import './style/dist/style.css';

class Main {
  app = document.getElementById('app');
  loader = new Loader();
  device = new Device();
  appState = new State();
  navigation = new Navigation();
  i18n = new Language();
  loadingPage: PageBase;
  constructor() {
    setTimeout(() => this.init(), 0);
  }

  private init() {
    document.body.prepend(new Navbar(this.appState));
    if (this.app) {
      this.loadIt();
      this.subscribes();
    } else console.error('No app element!');
  }

  private loadIt(): void {
    this.app?.replaceChildren(this.loader);
    this.loadingPage = new (this.navigation.getPage() as any);
    this.loadingPage.appState = this.appState;
  }

  private stateNavigate(page: string): void {
    this.navigation.getClickedPage(page);
    this.loadIt();
  }

  private loadPage(): void {
    this.app?.replaceChildren(this.loadingPage);
  }

  private subscribes(): void {
    window.addEventListener('popstate', () => this.loadIt());
    this.appState.setData('language', this.i18n);
    this.appState.subscribe(StateKeys.stateNavigate, this.stateNavigate.bind(this));
    this.appState.subscribe(StateKeys.pageContentLoaded, this.loadPage.bind(this));
    this.appState.subscribe(StateKeys.openModal, this.openModal.bind(this));
  }

  private openModal(content: any): void {
    const dialog = document.createElement('dialog');
    const closeBtn = document.createElement('span');
    const closeModal = () => {
      dialog.close();
      this.app?.removeChild(dialog);
    }
    closeBtn.className = 'close';
    closeBtn.onclick = () => closeModal();
    dialog.className = 'modal';
    dialog.append(content);
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