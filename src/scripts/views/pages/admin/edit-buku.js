/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import isUserLoggedIn from '../../../utils/auth';
import KidsLibraryDbSouce from '../../../data/kidslibrarydb-source';
import UrlParser from '../../../routes/url-parser';
import { createFormbuku } from '../../templates/template-creator';

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
    console.log(url.id);
    if (userRole !== 'Admin') {
      window.location.href = '/#/masuk';
      return;
    }

    const menuItems = document.querySelectorAll('.menu a');
    const menuactive = document.querySelector('.menu-buku');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuactive.classList.add('active');
    try {
      const buku = await KidsLibraryDbSouce.detailBuku(url.id);
      const formContainer = document.querySelector('.formContainer');
      formContainer.innerHTML = createFormbuku(buku);
    } catch (error) {
      if (Array.isArray(error.messages)) {
        console.log(error.messages);
      } else {
        console.log(error.message);
      }
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
        const response = await KidsLibraryDbSouce.editBuku(data);
        alert(response.message); // Tampilkan pesan sukses
        window.location.href = '/admin#/dashboard'; // Alihkan ke halaman masuk setelah berhasil
      } catch (error) {
        const errors = document.querySelector('.errors');
        errors.innerHTML = '';
        if (Array.isArray(error.messages)) {
          errors.innerHTML = `${error.messages.join(', ')}`;
        } else {
          errors.innerHTML = `${error.message}`;
        }
      }
    });
  },
};

export default EditBuku;
