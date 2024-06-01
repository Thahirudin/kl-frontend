const Daftar = {
  async render() {
    return `
        <div class="register-container">
      <div class="register-box">
        <img src="./logo/logo.png" alt="Kids Library" class="logo" />
        <form>
          <div class="input-container">
            <input type="text" placeholder="NAMA" required />
          </div>
          <div class="input-container">
            <input type="text" placeholder="USERNAME" required />
          </div>
          <div class="input-container">
            <input type="password" placeholder="PASSWORD" required />
          </div>
          <div class="input-container">
            <input type="password" placeholder="RE-PASSWORD" required />
          </div>
          <button type="submit">REGISTER</button>
          <a href="./#/masuk" class="back-to-login-link">Kembali ke Halaman Masuk</a>
        </form>
      </div>
    </div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default Daftar;
