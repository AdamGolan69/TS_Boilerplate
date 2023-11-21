import { Device, Language, Navigation, State } from "@services";
import { Navbar } from "@app/kit/navbar/navbar";
import { StateKeys } from "@services/state/config";
import { Loader } from "@app/kit/loader/lodaer";
import { PageBase } from "@decorators";

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
    this.loadIt();
    this.subscribes();
  }
  
  private loadIt(): void {
    this.app?.replaceChildren(this.loader);
    this.loadingPage = new (this.navigation.getPage() as const);
    this.loadingPage.appState = this.appState;
  }
  
  private stateNavigate(page: string): void {
    this.navigation.getClickedPage(page);
    this.loadIt();
  }

  private loadPage (): void {
    this.app?.replaceChildren(this.loadingPage);
  }
  
  private subscribes(): void {
    window.addEventListener('popstate', () => this.loadIt());
    // this.appState.setData('language', this.i18n.lang);
    this.appState.subscribe(StateKeys.stateNavigate, this.stateNavigate.bind(this));
    this.appState.subscribe(StateKeys.pageContentLoaded, this.loadPage.bind(this));
  }
}

new Main();