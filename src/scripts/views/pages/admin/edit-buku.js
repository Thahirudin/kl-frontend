/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import isUserLoggedIn from '../../../utils/auth';
import KidsLibraryDbSouce from '../../../data/kidslibrarydb-source';
import UrlParser from '../../../routes/url-parser';
import { createFormbuku, createModalTemplate } from '../../templates/template-creator';

const EditBuku = {
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

    .form h1{
      margin-bottom: 1rem;
      font-weight: 700;
      text-align: center;
    }

    .form-control {
      margin-bottom: 1rem;
    }

    .form-control label {
      display: block;
      margin-bottom: 0.5rem;
    }

    .form-control input, 
    .form-control select, 
    .form-control textarea {
      background-color: #f8fafc;
      width: 100%;
      margin: 0;
      border: 1px solid #94a3b8;
      padding: 0.6rem;
      border-radius: 0.6rem;
    }

    .form-control input:focus, 
    .form-control select:focus, 
    .form-control textarea:focus {
      outline: 1px solid #38bdf8;
    }

    .form-control button {
      background-color: #0284c7;
      color: white;
      border: none;
      border-radius: 0.6rem;
      padding: 1rem;
      width: 100%;
      cursor: pointer;
    }

    .errors {
      color: red;
    }

    </style>
    <div class="form">
      <h1>Edit Data Buku</h1>
      <div class="errors"></div>
      <div class="formContainer"></div>
    </div>
    <div class="modal"></div>

    `;
  },

  async afterRender() {
    if (!isUserLoggedIn()) {
      window.location.href = '/#/masuk'; // Alihkan ke halaman login jika belum login
      return;
    }
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    if (userRole !== 'Admin') {
      window.location.href = '/#/masuk';
      return;
    }
    const modal = document.querySelector('.modal');
    const menuItems = document.querySelectorAll('.menu a');
    const menuactive = document.querySelector('.menu-buku');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuactive.classList.add('active');
    const loading = document.querySelector('.loading');
    loading.classList.remove('open');
    try {
      loading.classList.add('open');
      const buku = await KidsLibraryDbSouce.detailBuku(url.id);
      const formContainer = document.querySelector('.formContainer');
      formContainer.innerHTML = createFormbuku(buku);
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

    const tambahForm = document.getElementById('tambahForm');
    tambahForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        id: url.id,
        judul: document.querySelector('#judul').value,
        kategori: document.querySelector('#kategori').value,
        ringkasan: document.querySelector('#ringkasan').value,
        penulis: document.querySelector('#penulis').value,
        image: document.querySelector('#imageUrl').files[0],
        readUrl: document.querySelector('#readUrl').value,
      };
      try {
        loading.classList.add('open');
        const response = await KidsLibraryDbSouce.editBuku(data);
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
          window.location.href = '/admin#/buku';
        });
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

export default EditBuku;
