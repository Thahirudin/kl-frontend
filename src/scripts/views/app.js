import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import adminRoutes from '../routes/admin-routes';

class App {
  constructor({
    button, drawer, content, userType,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._userType = userType;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const activeRoutes = this._getRoutes();
    const page = activeRoutes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }

  _getRoutes() {
    return this._userType === 'admin' ? adminRoutes : routes;
  }
}

export default App;
