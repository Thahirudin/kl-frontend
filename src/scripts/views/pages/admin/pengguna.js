/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import isUserLoggedIn from '../../../utils/auth';
import KidsLibraryDbSource from '../../../data/kidslibrarydb-source';
import { tableDataUserTemplate, tableUserTemplate } from '../../templates/template-creator';

const Pengguna = {
  USERS_PER_PAGE: 5,
  _currentUserPage: 1,
  _userList: [],
  async render() {
    return `
    <style>
    .pagination {
      max-width: 1200px;
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem 0;
      .page-number {
        min-width: 2rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        background-color: #cbd5e1;
      }
      .page-number.active {
          background-color: #0284c7;
          p{
            color: white;
          }
      }
    }
    </style>
         <section class="table_container">
        <h1>Tabel Pengguna</h1>
        <div class="table_responsive table_user"></div>
        <div class="pagination" id="pagination-users"></div>
      </section>
        `;
  },

  async afterRender() {
    if (!isUserLoggedIn()) {
      window.location.href = '/#/masuk';
      return;
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (userRole !== 'Admin') {
      window.location.href = '/#/masuk';
      return;
    }
    const menuItems = document.querySelectorAll('.menu a');
    const menuactive = document.querySelector('.menu-pengguna');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuactive.classList.add('active');
    const loading = document.querySelector('.loading');
    loading.classList.remove('open');
    try {
      loading.classList.add('open');
      const users = await KidsLibraryDbSource.getAllUser();
      this._userList = users.users;
      this._renderUsers();
      this._renderUserPaginationButtons();
    } catch (err) {
      if (Array.isArray(err.messages)) {
        alert(err.messages);
      } else {
        alert(err.message);
      }
    } finally {
      loading.classList.remove('open');
    }
  },
  _renderUsers() {
    const usersTableContainer = document.querySelector('.table_user');
    usersTableContainer.innerHTML = tableUserTemplate();
    const userTableRow = document.querySelector('.table_user tbody');
    const start = (this._currentUserPage - 1) * this.USERS_PER_PAGE;
    const end = start + this.USERS_PER_PAGE;
    const paginatedUsers = this._userList.slice(start, end);

    userTableRow.innerHTML = '';
    paginatedUsers.forEach((user) => {
      userTableRow.innerHTML += tableDataUserTemplate(user);
    });
  },
  _renderUserPaginationButtons() {
    const totalPages = Math.ceil(this._userList.length / this.USERS_PER_PAGE);
    const paginationContainer = document.querySelector('#pagination-users');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i += 1) {
      const pageButton = document.createElement('div');
      pageButton.classList.add('page-number');
      if (i === this._currentUserPage) {
        pageButton.classList.add('active');
      }
      pageButton.innerHTML = `<p>${i}</p>`;
      pageButton.addEventListener('click', () => {
        this._currentUserPage = i;
        this._renderUsers();
        this._renderUserPaginationButtons();
      });

      paginationContainer.appendChild(pageButton);
    }
  },
};

export default Pengguna;
