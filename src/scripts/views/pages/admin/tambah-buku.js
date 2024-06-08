/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import isUserLoggedIn from '../../../utils/auth';
import KidsLibraryDbSouce from '../../../data/kidslibrarydb-source';
import { createModalTemplate } from '../../templates/template-creator';

const TambahBuku = {
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
      <h1>Masukkan Data Buku</h1>
      <div class="errors"></div>
      <form id="tambahForm" method="post" enctype="multipart/form-data">
        <div class="form-control">
          <label for="judul">Judul :</label>
          <input
            placeholder="Judul"
            type="text"
            name="judul" id="judul"
            required
            autofocus
          />
        </div>
        <div class="form-control">
          <label for="kategori">Kategori :</label>
          <select name="kategori" id="kategori">
            <option value="Religi">Religi</option>
            <option value="Dongeng">Dongeng</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <div class="form-control">
          <label for="ringkasan">Ringkasan :</label>
          <textarea
            placeholder="Ringkasan"
            name="ringkasan" id="ringkasan"
            type="text"
            rows="10"
            required
          ></textarea>
        </div>
        <div class="form-control">
          <label for="penulis">Penulis :</label>
          <input placeholder="Penulis" name="penulis" id="penulis" type="text" required />
        </div>
        <div class="form-control">
          <label for="imageUrl">Image url :</label>
          <input
            placeholder="Image_url"
            name="imageUrl" id="imageUrl"
            type="file"
            required
          />
        </div>
        <div class="form-control">
          <label for="readUrl">Read url :</label>
          <input placeholder="Read Url" name="readUrl" id="readUrl" type="text" required />
        </div>
        <div class="form-control">
          <button class="submit">Submit</button>
        </div>
      </form>
    </div>
    <div class="modal"></div>
    `;
  },

  async afterRender() {
    if (!isUserLoggedIn()) {
      window.location.href = '/#/masuk'; // Alihkan ke halaman login jika belum login
      return;
    }

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

    const tambahForm = document.getElementById('tambahForm');
    const loading = document.querySelector('.loading');
    loading.classList.remove('open');
    tambahForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        judul: document.querySelector('#judul').value,
        kategori: document.querySelector('#kategori').value,
        ringkasan: document.querySelector('#ringkasan').value,
        penulis: document.querySelector('#penulis').value,
        image: document.querySelector('#imageUrl').files[0],
        readUrl: document.querySelector('#readUrl').value,
      };
      try {
        loading.classList.add('open');
        const response = await KidsLibraryDbSouce.tambahBuku(data);
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

export default TambahBuku;
