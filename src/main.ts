import { Device, Language, Navigation, State } from "@services";
import { Navbar } from "@app/kit/navbar/navbar";
import { StateKeys } from "@services/state/config";

class Main {
  app = document.getElementById('app');
  device = new Device();
  appState = new State();
  navigation = new Navigation();
  i18n = new Language();
  constructor() {
    setTimeout(() => this.init(), 0);
  }
  
  private init() {
    document.body.prepend(new Navbar(this.appState));
    this.navigate();
    this.subscribes();
  }
  
  private navigate() {
    this.app?.replaceChildren(new (this.navigation.getPage()));
  }
  
  private stateNavigate(page: string) {
    this.app?.replaceChildren(new (this.navigation.getClickedPage(page)));
  }
  
  private subscribes() {
    window.addEventListener('popstate', () => this.navigate());
    // this.appState.setData('language', this.i18n.lang);
    this.appState.subscribe(StateKeys.stateNavigate, this.stateNavigate.bind(this));
  }
}

new Main();