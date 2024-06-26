class footerBar extends HTMLElement {
  constructor() {
    super();
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
    <footer>
      <section class="footer_head">
        <div class="footer_logo">
          <img class="lazyload" data-src="./logo/logo-putih.png" alt="logo" width="200" height="100" />
          <div><p>Hidup Pintar Dengan Membaca</p></div>
        </div>
        <div class="footer_navigasi">
          <p>Navigasi</p>
          <ul>
            <li><a href="./#/beranda">Beranda</a></li>
            <li><a href="./#/buku">Buku</a></li>
            <li><a href="./#/favorit">Favorit</a></li>
            <li><a href="./#/tentang-kami">Tentang Kami</a></li>
          </ul>
        </div>
        <div class="footer_kontak">
          <p>Kontak</p>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/angga-cahyo-krisnanto/" target="_blank">Angga Cahyo krisnanto</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/farhan-putra-bunga-mayang-2121892b3/" target="_blank">Farhan Putra Bunga Mayang</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/thahirudin/" target="_blank">Thahirudin</a>
            </li>
          </ul>
        </div>
      </section>
      <section class="footer_copyright">
        <div><p>Copyright © 2024 - KidsLibrary. All Rights Reserved.</p></div>
      </section>
    </footer>
        `;
  }
}
customElements.define('footer-bar', footerBar);
