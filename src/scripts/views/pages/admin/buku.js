/* eslint-disable no-alert */
import { jwtDecode } from 'jwt-decode';
import isUserLoggedIn from '../../../utils/auth';
import {
  tableBukuTemplate,
  tableDataBukuTemplate,
} from '../../templates/template-creator';
import KidsLibraryDbSource from '../../../data/kidslibrarydb-source';

const Buku = {
  BOOKS_PER_PAGE: 5,
  _currentBookPage: 1,
  _bookList: [],

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
        <h1>Tabel Buku</h1>
        <div>
          <a class="tambah_button" href="/admin#/tambah-buku">Tambah Buku</a>
        </div>
        <div class="table_responsive table_buku"></div>
        <div class="pagination" id="pagination-books"></div>
      </section>
      <section class="sectionModal"></section>

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
      const books = await KidsLibraryDbSource.getAllBuku();
      this._bookList = books.buku;
      this._renderBooks();
      this._renderBookPaginationButtons();
    } catch (err) {
      console.error(err.message || 'Gagal menampilkan Buku');
    } finally {
      loading.classList.remove('open');
    }
  },

  _renderBooks() {
    const booksTableContainer = document.querySelector('.table_buku');
    booksTableContainer.innerHTML = tableBukuTemplate();
    const booksTableRow = document.querySelector('.table_buku tbody');
    const start = (this._currentBookPage - 1) * this.BOOKS_PER_PAGE;
    const end = start + this.BOOKS_PER_PAGE;
    const paginatedBooks = this._bookList.slice(start, end);

    booksTableRow.innerHTML = '';
    paginatedBooks.forEach((book) => {
      const row = document.createElement('tr');
      row.innerHTML = tableDataBukuTemplate(book);
      const deleteButton = row.querySelector('.delete_button');
      deleteButton.dataset.idBuku = book.id;
      booksTableRow.appendChild(row);
    });

    // Menambahkan event listener untuk tombol hapus buku
    const deleteBookButtons = document.querySelectorAll('.delete_button');
    deleteBookButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const loading = document.querySelector('.loading');
        loading.classList.remove('open');
        const bookId = event.target.dataset.idBuku;
        const confirmation = confirm('Apakah Anda yakin ingin menghapus buku ini?');
        if (confirmation) {
          try {
            loading.classList.add('open');
            const response = await KidsLibraryDbSource.hapusBuku(bookId);
            alert(response.message);
            const updatedBooks = await KidsLibraryDbSource.getAllBuku();
            this._bookList = updatedBooks.buku;

            // Render ulang data buku dan tombol paginasi
            this._renderBooks();
            this._renderBookPaginationButtons();
            window.location.reload();
          } catch (error) {
            // Tangani error jika ada
            console.error(error.message || 'Gagal menghapus buku');
          } finally {
            loading.classList.remove('open');
          }
        }
      });
    });
  },

  _renderBookPaginationButtons() {
    const totalPages = Math.ceil(this._bookList.length / this.BOOKS_PER_PAGE);
    const paginationContainer = document.querySelector('#pagination-books');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i += 1) {
      const pageButton = document.createElement('div');
      pageButton.classList.add('page-number');
      if (i === this._currentBookPage) {
        pageButton.classList.add('active');
      }
      pageButton.innerHTML = `<p>${i}</p>`;
      pageButton.addEventListener('click', () => {
        this._currentBookPage = i;
        this._renderBooks();
        this._renderBookPaginationButtons();
      });

      paginationContainer.appendChild(pageButton);
    }
  },
};

export default Buku;
