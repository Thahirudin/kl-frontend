/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import KidsLibraryDbSource from '../../data/kidslibrarydb-source';
import isUserLoggedIn from '../../utils/auth';
import { createModalTemplate } from '../templates/template-creator';

const Masuk = {
  async render() {
    return `
      <div class="login-container">
        <div class="login-box">
          <img src="./logo/logo.png" alt="Kids Library" class="logo" />
          <form id="loginForm">
            <div class="input-container">
              <input type="text" id="username" placeholder="Username" required />
            </div>
            <div class="input-container">
              <input type="password" id="password" placeholder="Password" required />
            </div>
            <button type="submit">LOGIN</button>
            <a href="#/daftar" class="signup-link">Belum Punya Akun?</a>
          </form>
        </div>
      </div>
      <div class="modal"></div>
    `;
  },

  async afterRender() {
    if (isUserLoggedIn()) {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole === 'Admin') {
        window.location.href = '/admin#/dashboard';
      } else {
        window.location.href = '/#/favorit';
      }
    }
    const modal = document.querySelector('.modal');
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const data = {
        username,
        password,
      };
      const loading = document.querySelector('.loading');
      loading.classList.remove('open');
      try {
        loading.classList.add('open');
        const result = await KidsLibraryDbSource.loginUser(data);
        const { token } = result;
        if (token) {
          localStorage.setItem('token', token);
          window.dispatchEvent(new CustomEvent('userLoggedIn'));
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;
          if (userRole === 'Admin') {
            const modalData = {
              title: 'Berhasil',
              message: 'Berhasil Login',
            };
            modal.innerHTML = createModalTemplate(modalData);
            const modalBg = document.querySelector('.modalbg');
            modalBg.classList.add('open');
            const submitModalButton = document.querySelector('.btn-submit');
            submitModalButton.addEventListener('click', () => {
              modalBg.classList.remove('open');
              modal.innerHTML = '';
              window.location.href = '/admin#/dashboard';
            });
          } else {
            const modalData = {
              title: 'Berhasil',
              message: 'Berhasil Login',
            };
            modal.innerHTML = createModalTemplate(modalData);
            const modalBg = document.querySelector('.modalbg');
            modalBg.classList.add('open');
            const submitModalButton = document.querySelector('.btn-submit');
            submitModalButton.addEventListener('click', () => {
              modalBg.classList.remove('open');
              modal.innerHTML = '';
              window.location.href = '/#/favorit';
              window.location.reload();
            });
          }
        } else {
          throw new Error('Token not received');
        }
      } catch (error) {
        if (Array.isArray(error.messages)) {
          const modalData = {
            title: 'Gagal',
            message: error.messages,
          };
          modal.innerHTML = createModalTemplate(modalData);
          const modalBg = document.querySelector('.modalbg');
          modalBg.classList.add('open');
          const submitModalButton = document.querySelector('.btn-submit');
          submitModalButton.addEventListener('click', () => {
            modalBg.classList.remove('open');
            modal.innerHTML = '';
          });
        } else {
          const modalData = {
            title: 'Gagal',
            message: error.message,
          };
          modal.innerHTML = createModalTemplate(modalData);
          const modalBg = document.querySelector('.modalbg');
          modalBg.classList.add('open');
          const submitModalButton = document.querySelector('.btn-submit');
          submitModalButton.addEventListener('click', () => {
            modalBg.classList.remove('open');
            modal.innerHTML = '';
          });
        }
      } finally {
        loading.classList.remove('open');
      }
    });
  },
};

export default Masuk;
