import { jwtDecode } from 'jwt-decode';
import KidsLibraryDbSource from '../../data/kidslibrarydb-source';
import isUserLoggedIn from '../../utils/auth';

const Favorit = {
  BOOKS_PER_PAGE: 8,

  async render() {
    return `
    <style>
      .title_page{
        max-width: 1200px;
        width: 90%;
        margin: auto;
        padding: 1rem 0;
        color:#1e293b;
      }
    </style>
      <search-bar></search-bar>
      <div class="kategori_container">
        <select name="kategori" id="kategori" class="kategori">
          <option value="">Kategori</option>
          <option value="Religi">Religi</option>
          <option value="Dongeng">Dongeng</option>
          <option value="Pendidikan">Pendidikan</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>
      <div class="title_page">
    <h1>Buku Favorit</h1>
    </div>
      <buku-container></buku-container>
      <div class="pagination" id="pagination"></div>
    `;
  },

  async afterRender() {
    if (!isUserLoggedIn()) {
      window.location.href = '#/masuk'; // Alihkan ke halaman login jika belum login
      return;
    }
    const token = localStorage.getItem('token'); // Simpan token di localStorage
    const decodedToken = jwtDecode(token);
    const loading = document.querySelector('.loading');
    loading.classList.remove('open');
    try {
      loading.classList.add('open');
      this._bukuList = await KidsLibraryDbSource.getFavoritByUserId(decodedToken.id);
      this._filteredBukuList = [...this._bukuList];
      this._currentPage = 1;

      this._renderBooks();
      this._renderPaginationButtons();
      this._setupSearch();
      this._setupCategoryFilter();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.classList.remove('open');
    }
  },

  _renderBooks() {
    const bukuContainer = document.querySelector('buku-container');
    const start = (this._currentPage - 1) * this.BOOKS_PER_PAGE;
    const end = start + this.BOOKS_PER_PAGE;
    const paginatedBooks = this._filteredBukuList.slice(start, end).map((item) => item.Buku);

    bukuContainer.setBukuList(paginatedBooks);
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

  _setupSearch() {
    const searchBar = document.querySelector('search-bar');
    searchBar.addEventListener('search', (event) => {
      this._filterBuku(event.detail.query, document.querySelector('#kategori').value);
    });
  },

  _setupCategoryFilter() {
    const categorySelect = document.querySelector('#kategori');
    categorySelect.addEventListener('change', (event) => {
      this._filterBuku(document.querySelector('search-bar').shadowRoot.querySelector('#searchElement').value, event.target.value);
    });
  },

  _filterBuku(query, category) {
    const searchQuery = query.toLowerCase();
    const searchCategory = category.toLowerCase();

    this._filteredBukuList = this._bukuList.filter((item) => {
      const buku = item.Buku;
      const matchesQuery = buku.judul.toLowerCase().includes(searchQuery);
      const matchesCategory = searchCategory === '' || buku.kategori.toLowerCase() === searchCategory;
      return matchesQuery && matchesCategory;
    });

    this._currentPage = 1;
    this._renderBooks();
    this._renderPaginationButtons();
  },
};

export default Favorit;
