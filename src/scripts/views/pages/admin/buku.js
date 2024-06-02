const Buku = {
  async render() {
    return `
        <section class="table_container">
            <h1>Tabel Buku</h1>
            <div>
              <a href="/admin#/tambah-buku" class="tambah_button">Tambah Buku</a>
            </div>
            <div class="table_responsive">
              <table>
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Penulis</td>
                    <td>Kategori</td>
                    <td>Aksi</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dongeng Sikancil</td>
                    <td>Thahirudin</td>
                    <td>Dongeng</td>
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
    const menuactive = document.querySelector('.menu-buku');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuactive.classList.add('active');
  },
};

export default Buku;
