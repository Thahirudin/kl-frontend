/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import KidsLibraryDbSource from '../../data/kidslibrarydb-source';
import isUserLoggedIn from '../../utils/auth';
import { formEditUser } from '../templates/template-creator';
import CONFIG from '../../globals/config';

const Profil = {
  async render() {
    return `
    <style>
    .form {
        width: 90%;
        margin: 0 auto;
        background-color: white;
        padding: 1rem;
        box-shadow: 0 0 8px 0 rgb(0 0 0 / 0.25);
        border-radius: 0.5rem;
        margin: 2rem auto;
      }
        h1{
          margin-bottom: 2rem;
          font-weight: 700;
          text-align: center;
        }
        .form-control {
          margin-bottom: 1rem;
          width: 100%;
          label {
            display: block;
            margin-bottom: 0.5rem;
          }
          input, select, textarea {
            background-color: #f8fafc;
            width: 100%;
            margin: 0;
            border: 1px solid #94a3b8;
            padding: 0.6rem;
            border-radius: 0.6rem;
          }
          input:focus, select:focus, textarea:focus {
            outline: 1px solid #38bdf8;
          }
          button{
            background-color: #0284c7;
            color: white;
            border: none;
            border-radius: 0.6rem;
            padding: 0.8rem;
            width: 100%;
            cursor: pointer;
          }
        }
          .profil {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        border: 2px solid #ccc;
        margin-bottom: 2rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    </style>
      <div class="form">
          <h1>Halaman Profil User</h1>
      <div class="errors"></div>
        <div class="profil"></div>
          <div class="formContainer"></div>
        </div>
      `;
  },

  async afterRender() {
    if (!isUserLoggedIn()) {
      window.location.href = '/#/masuk';
      return;
    }
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const loading = document.querySelector('.loading');
    loading.classList.remove('open');
    try {
      loading.classList.add('open');
      const user = await KidsLibraryDbSource.detailUser(decodedToken.id);
      const formContainer = document.querySelector('.formContainer');
      formContainer.innerHTML = formEditUser(user.user);
      const profilImage = document.querySelector('.profil');
      profilImage.innerHTML = `
            <img src="${user.profil !== '' ? `${CONFIG.BASE_URL}${user.user.profil}` : './img/profil.png'}" alt="profil" />
        `;
    } catch (err) {
      if (Array.isArray(err.messages)) {
        alert(err.messages);
      } else {
        alert(err.message);
      }
    } finally {
      loading.classList.remove('open');
    }
    const editForm = document.getElementById('formEditUser');
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        id: decodedToken.id,
        nama: document.querySelector('#nama').value,
        email: document.querySelector('#email').value,
        tanggalLahir: document.querySelector('#tanggalLahir').value,
        jk: document.querySelector('#jk').value,
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
        image: document.querySelector('#profil').files[0],
        role: decodedToken.role,
      };
      try {
        loading.classList.add('open');
        const response = await KidsLibraryDbSource.editUser(data);
        alert(response.message);
        window.location.reload();
      } catch (error) {
        const errors = document.querySelector('.errors');
        errors.innerHTML = '';
        if (Array.isArray(error.messages)) {
          errors.innerHTML = `${error.messages.join(', ')}`;
        } else {
          errors.innerHTML = `${error.message}`;
        }
      } finally {
        loading.classList.remove('open');
      }
    });
  },
};

export default Profil;
