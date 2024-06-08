/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import isUserLoggedIn from '../../../utils/auth';
import KidsLibraryDbSource from '../../../data/kidslibrarydb-source';
import { tableBukuTemplate, tableDataBukuTemplate } from '../../templates/template-creator';

const Buku = {
  BOOKS_PER_PAGE: 5, // Tetapkan jumlah buku per halaman

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
      padding: 4rem 0;
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
        <h1>Tabel Buku</h1>
        <div>
          <a class="tambah_button" href="/admin#/tambah-buku">Tambah Buku</a>
        </div>
        <div class="table_responsive table_buku"></div>
      <div class="pagination" id="pagination"></div>
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
    const menuactive = document.querySelector('.menu-buku');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuactive.classList.add('active');
    const loading = document.querySelector('.loading');
    loading.classList.remove('open');
    try {
      loading.classList.add('open');
      const bukus = await KidsLibraryDbSource.getAllBuku();
      this._bukuList = bukus.buku;
      this._filteredBukuList = [...this._bukuList];
      this._currentPage = 1;

      this._renderBooks();
      this._renderPaginationButtons();
    } catch (err) {
      if (Array.isArray(err.messages)) {
        console.log(err.messages.join(', '));
      } else {
        console.log(err.message || 'Gagal menampilkan Buku');
      }
    } finally {
      loading.classList.remove('open');
    }
    const deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener('click', async (event) => {
        loading.classList.remove('open');
        const { idBuku } = event.target.dataset;

        const confirmation = confirm('Apakah Anda yakin ingin menghapus buku ini?');
        if (confirmation) {
          try {
            loading.classList.add('open');
            const response = await KidsLibraryDbSource.hapusBuku(idBuku);
            alert(response.message);
            window.location.reload();
          } catch (error) {
            if (Array.isArray(error.messages)) {
              alert(error.messages);
            } else {
              alert(error.messages);
            }
          } finally {
            loading.classList.remove('open');
          }
        }
      });
    });
  },

  _renderBooks() {
    const bukusTableContainer = document.querySelector('.table_buku');
    bukusTableContainer.innerHTML = tableBukuTemplate();
    const bukusTableRow = document.querySelector('.table_buku tbody');
    const start = (this._currentPage - 1) * this.BOOKS_PER_PAGE;
    const end = start + this.BOOKS_PER_PAGE;
    const paginatedBooks = this._filteredBukuList.slice(start, end);

    bukusTableRow.innerHTML = '';
    paginatedBooks.forEach((buku) => {
      const row = document.createElement('tr');
      row.innerHTML = tableDataBukuTemplate(buku);
      const deleteButton = row.querySelector('.delete_button');
      deleteButton.dataset.idBuku = buku.id;
      bukusTableRow.appendChild(row);
    });
  },

  _renderPaginationButtons() {
    const totalPages = Math.ceil(this._filteredBukuList.length / this.BOOKS_PER_PAGE);
    const paginationContainer = document.querySelector('#pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i += 1) {
      const pageButton = document.createElement('div');
      pageButton.classList.add('page-number');
      if (i === this._currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.innerHTML = `<p>${i}</p>`;
      pageButton.addEventListener('click', () => {
        this._currentPage = i;
        this._renderBooks();
        this._renderPaginationButtons();
      });

      paginationContainer.appendChild(pageButton);
    }
  },
};

export default Buku;
