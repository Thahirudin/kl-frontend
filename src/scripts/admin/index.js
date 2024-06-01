import 'regenerator-runtime';
import '../../styles/style-admin.css';
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
});
