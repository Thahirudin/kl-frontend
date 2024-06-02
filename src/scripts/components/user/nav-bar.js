import isUserLoggedIn from '../../utils/auth';

class navBar extends HTMLElement {
  constructor() {
    super();
    this.isLoggedIn = isUserLoggedIn();
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav>
        <div class="nav_head">
          <img src="./logo/logo.png" alt="logo" />
          <div>
            <button id="nav_hamburger_button">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="nav_body">
          <div class="nav_menu">
            <ul>
              <li><a href="#/beranda">Beranda</a></li>
              <li><a href="#/buku">Buku</a></li>
              <li><a href="#/favorit">Favorit</a></li>
            </ul>
          </div>
          <div class="nav_login_register">
            <a class="nav_login" href=".#/masuk">Masuk</a>
            <a class="nav_register" href="./#/daftar">Daftar</a>
          </div>
        </div>
      </nav>
        `;
    const buttonContainer = this.querySelector('.nav_login_register');

    // Tampilkan tombol login/logout berdasarkan status login pengguna
    if (this.isLoggedIn) {
      buttonContainer.innerHTML = '<button id="logoutButton" class="nav_logout">Keluar</button> <a class="nav_register" href="./#/profil">Profil</a';
    } else {
      buttonContainer.innerHTML = '<a class="nav_login" href="./#/masuk">Masuk</a> <a class="nav_register" href="./#/daftar">Daftar</a> ';
    }

    // Tambahkan event listener untuk tombol logout jika pengguna sudah login
    if (this.isLoggedIn) {
      const logoutButton = this.querySelector('#logoutButton');
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        buttonContainer.innerHTML = '<a class="nav_login" href="./#/masuk">Masuk</a> <a class="nav_register" href="./#/daftar">Daftar</a> ';
        window.location.href = './#/masuk'; // Arahkan ke halaman masuk setelah logout
      });
    }
  }
}

customElements.define('nav-bar', navBar);
