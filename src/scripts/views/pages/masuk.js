/* eslint-disable no-alert */
const Masuk = {
  async render() {
    return `
      <div class="login-container">
        <div class="login-box">
          <img src="./logo/logo.png" alt="Kids Library" class="logo" />
          <form id="loginForm">
            <div class="input-container">
              <input type="email" id="email" placeholder="Email" required />
            </div>
            <div class="input-container">
              <input type="password" id="password" placeholder="Password" required />
            </div>
            <button type="submit">LOGIN</button>
            <a href="#/daftar" class="signup-link">Belum Punya Akun?</a>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Mencegah form submit default

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('https://kids-library-production.up.railway.app/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        const { token } = data; // Asumsi token ada di data.token

        // Simpan token (misalnya, ke localStorage)
        localStorage.setItem('token', token);
        alert('Login berhasil!');
        window.location.href = './#/favorit';
      } catch (error) {
        console.error('Error:', error);
        alert('Login gagal. Silakan coba lagi.');
      }
    });
  },
};

export default Masuk;
