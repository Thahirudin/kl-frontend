const Pengguna = {
  async render() {
    return `
         <section class="table_container">
          <h1>Tabel Pengguna</h1>
          <div>
            <button class="tambah_button">Tambah Pengguna</button>
          </div>
          <div class="table_responsive">
            <table>
              <thead>
                <tr>
                  <td>Nama</td>
                  <td>Email</td>
                  <td>Tanggal Lahir</td>
                  <td>Aksi</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thahirudin</td>
                  <td>tohiruzain098@gmail.com</td>
                  <td>10 Februari 2003</td>
                  <td class="aksi">
                    <a href="#" class="edit_button">Edit</a>
                    <a href="#" class="delete_button">Hapus</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        `;
  },

  async afterRender() {
    const menuItems = document.querySelectorAll('.menu a');
    const menuactive = document.querySelector('.menu-pengguna');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuactive.classList.add('active');
  },
};

export default Pengguna;
