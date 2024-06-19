import 'regenerator-runtime';
import '../components/admin/aside-bar';
import '../../styles/style-admin.css';
import swRegister from '../utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from '../views/app';

const app = new App({
  button: document.querySelector('#nav_hamburger_button'),
  drawer: document.querySelector('aside'),
  content: document.querySelector('#mainContent'),
  userType: 'admin',
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
