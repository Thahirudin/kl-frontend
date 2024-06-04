import { jwtDecode } from 'jwt-decode';
import isUserLoggedIn from '../../../utils/auth';
import KidsLibraryDbSouce from '../../../data/kidslibrarydb-source';
import {
  tableBukuTemplate, tableDataBukuTemplate, tableDataUserTemplate, tableUserTemplate,
} from '../../templates/template-creator';

const Dashboard = {
  async render() {
    return `<section class="section_total">
          <div class="card_dashboard">
            <div class="card_title">Total Pengguna</div>
            <div class="card_deskripsi">20</div>
          </div>
          <div class="card_dashboard">
            <div class="card_title">Total Buku</div>
            <div class="card_deskripsi">20</div>
          </div>
        </section>
        <section class="table_container">
          <h1>Tabel Buku</h1>
          <div>
            <a class="tambah_button" href="/admin#/tambah-buku">Tambah Buku</a>
          </div>
          <div class="table_responsive table_buku"></div>
        </section>
        <section class="table_container">
          <h1>Tabel User</h1>
          <div>
            <button class="tambah_button">Tambah User</button>
          </div>
          <div class="table_responsive table_user"></div>
        </section>
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
    try {
      const bukus = await KidsLibraryDbSouce.getAllBuku();
      const bukusTableContainer = document.querySelector('.table_buku');
      bukusTableContainer.innerHTML = tableBukuTemplate();
      const bukusTableRow = document.querySelector('.table_buku tbody');
      bukus.forEach((buku) => {
        bukusTableRow.innerHTML += tableDataBukuTemplate(buku);
      });
    } catch (err) {
      if (Array.isArray(err.messages)) {
        console.log(err.messages.join(', '));
      } else {
        console.log(err.message || 'Gagal menampilkan Buku');
      }
    }

    try {
      const users = await KidsLibraryDbSouce.getAllUser();
      const usersTableContainer = document.querySelector('.table_user');
      usersTableContainer.innerHTML = tableUserTemplate();
      const userTableRow = document.querySelector('.table_user tbody');
      users.forEach((user) => {
        userTableRow.innerHTML += tableDataUserTemplate(user);
      });
    } catch (err) {
      if (Array.isArray(err.messages)) {
        console.log(err.messages.join(', '));
      } else {
        console.log(err.message || 'Gagal menampilkan User');
      }
    }
    const menuItems = document.querySelectorAll('.menu a');
    const menuactive = document.querySelector('.menu-dashboard');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuactive.classList.add('active');
  },
};

export default Dashboard;
