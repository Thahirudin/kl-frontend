import CONFIG from '../../globals/config';

class BukuItem extends HTMLElement {
  _shadowRoot = null;

  _style = null;

  _bukus = {
    id: null,
    judul: null,
    image_url: null,
    penulis: null,
    ringkasan: null,
    kategori: null,
    read_url: null,
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Plus Jakarta Sans", sans-serif;
}
.buku_card {
  padding: 1rem;
  border: 1px solid #d3d3d3;
  background-color: white;
  border-radius: 1rem;
  color: #0f172a;
  height: 100%;
}
a{
    text-decoration: none;
}
.buku_card:hover {
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  .buku_judul h2{
    color: #0284c7;
    transition: 0.5s ease-in-out;
  }
}
.buku_img {
display:flex;
justify-content: center;
align-items:center;
  margin: auto;
  text-align: center;
  margin-bottom: 1rem;
}
.buku_body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.buku_kategori {
  color: #334155;
}
.buku_judul h2 {
  font-size: 18px;
}
.buku_img img {
  max-width: 100%;
    max-height: 200px;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  border-radius: 0.5rem;
}

      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  setBuku(value) {
    if (value.Buku) {
      this._bukus.id = value.Buku.id;
      this._bukus.judul = value.Buku.judul;
      this._bukus.image_url = value.Buku.imageUrl;
      this._bukus.kategori = value.Buku.kategori;
      this._bukus.ringkasan = value.Buku.ringkasan;
      this._bukus.penulis = value.Buku.penulis;
      this._bukus.read_url = value.Buku.readUrl;
    } else {
      this._bukus.id = value.id;
      this._bukus.judul = value.judul;
      this._bukus.image_url = value.imageUrl;
      this._bukus.kategori = value.kategori;
      this._bukus.ringkasan = value.ringkasan;
      this._bukus.penulis = value.penulis;
      this._bukus.read_url = value.readUrl;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <a href="#/detail-buku/${this._bukus.id}">
            <div class="buku_card">
              <div class="buku_img">
                <img class="lazyload"
                  src="${CONFIG.BASE_URL}${this._bukus.image_url}"
                  alt="${this._bukus.judul}"
                />
              </div>
              <div class="buku_body">
                <div class="buku_kategori"><p>${this._bukus.kategori}</p></div>
                <div class="buku_judul">
                  <h2>${this._bukus.judul}</h2>
                </div>
              </div>
            </div>
          </a>
      `;
  }
}

customElements.define('buku-item', BukuItem);
