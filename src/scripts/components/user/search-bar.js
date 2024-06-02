class SearchBar extends HTMLElement {
  constructor() {
    super();

    // Buat shadow root
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Render
    this.render();
  }

  connectedCallback() {
    // Panggil render saat elemen ditambahkan ke DOM
    this.render();
  }

  render() {
    // Kosongkan isi shadow root sebelum dirender ulang
    this._emptyContent();

    // Buat elemen style dan tambahkan styling ke dalamnya
    const style = document.createElement('style');
    style.textContent = `
    .search-container {
    padding: 2rem 0;
  }
      form {
  margin: 0 auto;
  width: 90%;
  display: flex;
  align-items: center;
}

form > input {
  width: 100%;
  align-items: center;
  padding: 15px 15px;
  border: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 1px solid #0284c7;
  max-height: 58px;
}

form > input:focus {
  outline: 3px solid #f59670a7;
  outline-offset: 1px;
}

form > input::placeholder {
  font-family: "Poppins", sans-serif;
  font-size: 9pt;
}

form > button {
  padding: 15px 22px;
  background-color: #0284c7;
  border: 1px solid #0284c7;
  color: white;
  cursor: pointer;
  max-height: 58px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

form > button > svg {
  height: 11pt;
}

form > button:hover {
  background-color: #0284c7;
}
@media screen and (min-width: 768px) {
  .search-container {
    margin: 0 auto;
    max-width: 50%;
    padding: 1rem 0;
  }
}
    `;

    // Buat elemen container untuk input dan tombol pencarian
    const container = document.createElement('div');
    container.id = 'search-container';
    container.classList.add('search-container');
    container.innerHTML = `
          <form id="searchForm">
            <input
            placeholder="Cari Buku Keinginan Kamu, contoh: Sikancil"
            id="searchElement"
            type="search"
          />
          <button id="searchButtonElement" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#fff"
                d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51
            99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62
            56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128
            128S79.1 278.6 79.1 208z"
              ></path>
            </svg>
          </button>
          </form>
      `;
    this._shadowRoot.appendChild(style);
    this._shadowRoot.appendChild(container);

    this._shadowRoot.querySelector('#searchForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const query = this._shadowRoot.querySelector('#searchElement').value;
      this.dispatchEvent(new CustomEvent('search', {
        detail: { query },
        bubbles: true,
        composed: true,
      }));
    });
  }

  // Fungsi untuk mengosongkan isi shadow root
  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
}

customElements.define('search-bar', SearchBar);
