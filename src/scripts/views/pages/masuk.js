/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import KidsLibraryDbSource from '../../data/kidslibrarydb-source';
import isUserLoggedIn from '../../utils/auth';

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
        window.location.href = '#/favorit';
      }
    }

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Mencegah form submit default

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const data = {
        username,
        password,
      };

      try {
        const result = await KidsLibraryDbSource.loginUser(data);
        const { token } = result;

        if (token) {
          localStorage.setItem('token', token); // Simpan token di localStorage

          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;
          const headerContainer = document.querySelector('header');
          const navContainer = document.querySelector('nav-bar');
          navContainer.remove();
          headerContainer.innerHTML = `
            <nav-bar></nav-bar>
          `;
          if (userRole === 'Admin') {
            window.location.href = '/admin#/dashboard'; // Arahkan ke halaman dashboard
          } else {
            window.location.href = '#/favorit'; // Arahkan ke halaman favorit
          }
        } else {
          throw new Error('Token not received');
        }
      } catch (error) {
        alert(`Login gagal: ${error.message}`); // Tampilkan pesan kesalahan
      }
    });
  },
};

export default Masuk;
