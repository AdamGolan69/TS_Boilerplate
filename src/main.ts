import { Device, Language, Navigation, State } from "./services";

class Main {
  app = document.getElementById('app');
  appState = new State();
  navigation = new Navigation();
  device = new Device();
  i18n = new Language();
  constructor() {
    this.app?.append(new (this.navigation.getPage()));
    // this.appState.setData('language', this.i18n.lang);
  }
}

new Main();