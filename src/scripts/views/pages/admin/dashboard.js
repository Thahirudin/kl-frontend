const Dashboard = {
  async render() {
    return `<section class="section_total">
          <div class="card_dashboard">
            <div class="card_title">Total Pengguna</div>
            <div class="card_deskripsi">20</div>
          </div>
          <div class="card_dashboard">
            <div class="card_title">Total Buku</div>
            <div class="card_deskripsi">20</div>
          </div>
        </section>
        <section class="table_container">
          <h1>Tabel Buku</h1>
          <div>
            <button class="tambah_button">Tambah Buku</button>
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
        <section class="table_container">
          <h1>Tabel Buku</h1>
          <div>
            <button class="tambah_button">Tambah Buku</button>
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
    const menuItems = document.querySelectorAll(".menu a");
    const menuactive = document.querySelector(".menu-dashboard");
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    menuactive.classList.add("active");
  },
};

export default Dashboard;
