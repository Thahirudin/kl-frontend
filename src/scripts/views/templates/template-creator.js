import CONFIG from '../../globals/config';

const createLikeButtonTemplate = () => `
  <button aria-label="like this buku" id="likeButton" class="like">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this buku" id="likeButton" class="like">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
  </button>
`;

const createDeleteModalTemplate = (modal) => `
<style>
    .modalbg.open{
        opacity: 1; /* Tampilkan saat modal terbuka */
    visibility: visible;
    .modal-container{
        transform: translateY(0);
    }
    }
    .modalbg {
      position: fixed; /* Tetapkan posisi tetap */
      top: 0;
      left: 0;
      width: 100vw; /* Lebar penuh layar */
      height: 100vh; /* Tinggi penuh layar */
      background-color: rgba(0, 0, 0, 0.5); /* Latar belakang semi transparan */
      display: flex; /* Gunakan Flexbox */
      justify-content: center; /* Pusatkan secara horizontal */
      align-items: center; /* Pusatkan secara vertikal */
      visibility: hidden; /* Awalnya tidak terlihat */
    transition: opacity 0.5s ease, visibility 0.5s ease;
      z-index: 1000;
      .modal-container {
        transform: translateY(-20px); /* Awalnya sedikit bergeser ke atas */
    transition: transform 0.5s ease;
        background-color: white; /* Warna latar belakang modal */
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px; /* Opsional: untuk sudut yang melengkung */
        max-width: 90%; /* Batasan lebar maksimal agar responsif */
        max-height: 90%; /* Batasan tinggi maksimal agar responsif */
        overflow-y: auto;
        .modal-header {
          padding: 1rem;
        }
        .modal-body {
          padding: 1rem;
        }
        .modal-footer {
          font-size: 16px;
          padding: 1rem;
          display: flex;
          justify-content: end;
          gap: 1rem;
          .btn-submit {
            background-color: #0284c7;
            padding: 0.8rem 1rem;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
          }
          .btn-submit:hover {
            background-color: #0ea5e9;
          }
          .btn-close {
            background-color: white;
            padding: 0.8rem 1rem;
            color: #0284c7;
            border: 1px solid #0284c7;
            border-radius: 0.5rem;
            cursor: pointer;
          }
        }
      }
    }
  </style>
<div class="modalbg delete-modal">
  <div class="modal-container">
    <div class="modal-header">
      <h2>${modal.judul}</h2>
    </div>
    <hr />
    <div class="modal-body">
      <p>Kamu Yakin Ingin Menghapus ini</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn-submit">Submit</button>
      <button type="button" class="btn-close">Close</button>
    </div>
  </div>
</div>
`;

const createSuccessModalTemplate = () => `
<div class="modalbg success-modal">
  <div class="modal-container">
    <div class="modal-header">
      <h2>Berhasil</h2>
    </div>
    <hr />
    <div class="modal-body">
      <p>Buku berhasil dihapus</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn-close">Close</button>
    </div>
  </div>
</div>
`;

const formEditUser = (user) => `
<form id="formEditUser" action="" method="post" enctype="multipart/form-data">
            <div class="form-control">
              <label for="nama">Nama :</label>
              <input
                placeholder="Nama"
                type="text"
                name="nama"
                id="nama" value="${user.nama}"
                required
              />
            </div>
            <div class="form-control">
              <label for="email">Email :</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email" value="${user.email}"
              />
            </div>
            <div class="form-control">
              <label for="tanggalLahir">Tanggal Lahir :</label>
              <input
                placeholder="Tanggal Lahir"
                type="date"
                name="tanggalLahir"
                id="tanggalLahir" value="${new Date(user.tanggalLahir).toISOString().substr(0, 10)}"
                required
              />
            </div>
            <div class="form-control">
              <label for="jk">Jenis Kelamin :</label>
              <select name="jk" id="jk">
                <option value="Laki-Laki" ${user.jk === 'Laki-Laki' ? 'selected' : ''}>Laki-laki</option>
                <option value="Perempuan" ${user.jk === 'Perempuan' ? 'selected' : ''}>Perempuan</option>
              </select>
            </div>
            <div class="form-control">
              <label for="profil">Ganti Profil :</label>
              <input
                type="file"
                name="profil"
                id="profil"
              />
            </div>
            <div class="form-control">
              <label for="penulis">Username :</label>
              <input
                placeholder="Username"
                name="username"
                id="username"
                type="text" value="${user.username}"
                required
              />
            </div>
            <div class="form-control">
              <label for="password">Ganti Password :</label>
              <input
                placeholder="Password "
                name="password"
                id="password"
                type="password"
              />
            </div>
            <div class="form-control">
              <button class="submit" type="submit">Simpan</button>
            </div>
          </form>
`;

const tableDataBukuTemplate = (buku) => `
<tr>
  <td>${buku.judul}</td>
  <td>${buku.penulis}</td>
  <td>${buku.kategori}</td>
  <td>
    <div class="aksi">
      <a href="/admin#/edit-buku/${buku.id}" class="edit_button">Edit</a>
      <button class="delete_button">Hapus</button>
    </div>
  </td>
</tr>
`;
const tableBukuTemplate = () => `
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
              </tbody>
            </table>
`;

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', options);
};

const tableDataUserTemplate = (user) => `
<tr>
  <td>${user.nama}</td>
  <td>${formatDate(user.tanggalLahir)}</td>
  <td>${user.username}</td>
</tr>
`;

const createFormbuku = (buku) => `
      <form id="tambahForm" method="post" enctype="multipart/form-data">
        <div class="form-control">
          <label for="judul">Judul :</label>
          <input
            placeholder="Judul"
            type="text"
            name="judul" id="judul" value="${buku.judul}"
            required
            autofocus
          />
        </div>
        <div class="form-control">
          <label for="kategori">Kategori :</label>
          <select name="kategori" id="kategori">
            <option value="Religi" ${buku.kategori === 'Religi' ? 'selected' : ''}>Religi</option>
            <option value="Dongeng" ${buku.kategori === 'Dongeng' ? 'selected' : ''}>Dongeng</option>
            <option value="Pendidikan" ${buku.kategori === 'Pendidikan' ? 'selected' : ''}>Pendidikan</option>
            <option value="Lainnya" ${buku.kategori === 'Lainnya' ? 'selected' : ''}>Lainnya</option>
          </select>
        </div>
        <div class="form-control">
          <label for="ringkasan">Ringkasan :</label>
          <textarea
            placeholder="Ringkasan"
            name="ringkasan" id="ringkasan"
            type="text"
            rows="10"
            required
          >${buku.ringkasan}</textarea>
        </div>
        <div class="form-control">
          <label for="penulis">Penulis :</label>
          <input placeholder="Penulis" name="penulis" id="penulis" type="text" required value="${buku.penulis}" />
        </div>
        <div class="form-control">
          <label for="imageUrl">Image url :</label>
          <input
            placeholder="Image_url"
            name="imageUrl" id="imageUrl"
            type="file"
          />
        </div>
        <div class="form-control">
          <label for="readUrl">Read url :</label>
          <input placeholder="Read Url" name="readUrl" id="readUrl" type="text" required value="${buku.readUrl}" />
        </div>
        <div class="form-control">
          <button class="submit">Submit</button>
        </div>
      </form>
`;
const tableUserTemplate = () => `
            <table>
              <thead>
                <tr>
                  <td>Nama</td>
                  <td>Tanggal Lahir</td>
                  <td>Username</td>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
`;
const createBukuDetailTemplate = (buku) => `
  <div class="buku_container">
          <div class="buku_img">
            <img
              src="${CONFIG.BASE_URL}${buku.imageUrl}"
              alt="gambar buku"
            />
          </div>
          <div class="buku_body">
            <h1>
              ${buku.judul}
            </h1>
            <div class="buku_url">
              <a href="${buku.readUrl}">Baca Buku</a>
            </div>
            <div class="detail_buku">
              <div class="card_detail">
                <h2>Kategori</h2>
                <div>
                  <p>${buku.kategori}</p>
                </div>
              </div>
              <div class="card_detail">
                <h2>Penulis</h2>
                <div>
                  <p>${buku.penulis}</p>
                </div>
              </div>
              <div class="card_detail">
                <p>
                  ${buku.ringkasan}
                </p>
              </div>
            </div>
          </div>
        </div>
`;

export {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createBukuDetailTemplate,
  tableBukuTemplate,
  tableDataBukuTemplate,
  tableUserTemplate,
  tableDataUserTemplate,
  createFormbuku,
  createDeleteModalTemplate,
  createSuccessModalTemplate,
  formEditUser,
};
