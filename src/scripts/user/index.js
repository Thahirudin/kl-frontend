import 'regenerator-runtime';
import '../../styles/style.css';
import '../../styles/home.css';
import '../components/user/nav-bar';
import '../components/user/search-bar';
import '../components/user/buku-container';
import '../components/user/buku-item';
import '../components/user/footer-bar';
import swRegister from '../utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from '../views/app';

const app = new App({
  button: document.querySelector('#nav_hamburger_button'),
  drawer: document.querySelector('.nav_body'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
