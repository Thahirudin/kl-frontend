class BukuContainer extends HTMLElement {
  _shadowRoot = null;

  _style = null;

  _bukuList = [];

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  setBukuList(value) {
    this._bukuList = value;
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
        .buku_container {
  max-width: 1200px;
  padding: 1rem 0;
  margin: auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.buku_card {
  padding: 1rem;
  border: 1px solid #d3d3d3;
  background-color: white;
  border-radius: 1rem;
  color: #0f172a;
}
.buku_card:hover {
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}
.buku_img {
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
  max-height: 200px;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}

@media screen and (min-width: 768px) {
  .buku_container {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 3rem 0;
  }

}
@media screen and (min-width: 1200px) {
  .buku_container {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}

      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    const bukuItemElements = this._bukuList.map((item) => {
      const buku = document.createElement('buku-item');
      buku.setBuku(item);
      return buku;
    });
    this._shadowRoot.innerHTML += `      
        <div class="buku_container">
        </div>
    `;
    this._shadowRoot.querySelector('.buku_container').append(...bukuItemElements);
  }
}

customElements.define('buku-container', BukuContainer);
