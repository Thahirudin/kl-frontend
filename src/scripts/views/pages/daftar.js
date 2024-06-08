/* eslint-disable max-len */
/* eslint-disable no-alert */
import KidsLibraryDbSource from '../../data/kidslibrarydb-source';
import { createModalTemplate } from '../templates/template-creator';

const Daftar = {
  async render() {
    return `
    <div class="register-container">
      <div class="register-box">
        <img src="./logo/logo.png" alt="Kids Library" class="logo lazyload" />
        <form id="regisForm">
          <div class="errors"></div>
          <div class="input-container">
            <input type="text" placeholder="NAMA" name="nama" id="nama" required/>
          </div>
          <div class="input-container">
            <input type="date" name="taanggalLahir" id="tanggalLahir" required />
          </div>
          <div class="input-container">
            <select name="jk" id="jk">
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div class="input-container">
            <input type="text" placeholder="USERNAME" name="username" id="username" required />
          </div>
          <div class="input-container">
            <input type="password" placeholder="PASSWORD" name="password" id="password" required />
          </div>
          <button type="submit">DAFTAR</button>
          <a href="/#/masuk" class="back-to-login-link">BACK TO LOGIN</a>
        </form>
      </div>
    </div>
    <div class="modal"></div>
    `;
  },

  async afterRender() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
    const regisForm = document.getElementById('regisForm');
    const modal = document.querySelector('.modal');
    regisForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        nama: document.querySelector('#nama').value,
        profil: '',
        tanggalLahir: document.querySelector('#tanggalLahir').value,
        role: 'User',
        email: '',
        jk: document.querySelector('#jk').value,
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
      };
      const loading = document.querySelector('.loading');
      loading.classList.remove('open');
      try {
        loading.classList.add('open');
        const response = await KidsLibraryDbSource.tambahUser(data);
        const modalData = {
          title: 'Berhasil',
          message: response.message,
        };
        modal.innerHTML = createModalTemplate(modalData);
        const modalBg = document.querySelector('.modalbg');
        modalBg.classList.add('open');
        const submitModalButton = document.querySelector('.btn-submit');
        submitModalButton.addEventListener('click', () => {
          modalBg.classList.remove('open');
          modal.innerHTML = '';
          window.location.href = '/#/masuk';
        });
      } catch (error) {
        if (error.messages) {
          errors.innerHTML = `${error.messages}`;
        } else {
          errors.innerHTML = `${error.message}`;
        }
      } finally {
        loading.classList.remove('open');
      }
    });
  },
};

export default Daftar;
