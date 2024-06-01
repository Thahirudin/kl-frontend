const TambahBuku = {
  async render() {
    return `
    <style>

.form {
  width: 90%;
  margin: 0 auto;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 0.25);
  border-radius: 0.5rem;
  margin: 2rem auto;
  h1{
    margin-bottom: 1rem;
    font-weight: 700;
    text-align: center;
  }
  .form-control {
    margin-bottom: 1rem;
    width: 100%;
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input, select, textarea {
      background-color: #f8fafc;
      width: 100%;
      margin: 0;
      border: 1px solid #94a3b8;
      padding: 0.6rem;
      border-radius: 0.6rem;
    }
    input:focus, select:focus, textarea:focus {
      outline: 1px solid #38bdf8;
    }
    button{
      background-color: #0284c7;
      color: white;
      border: none;
      border-radius: 0.6rem;
      padding: 0.8rem;
      width: 100%;
      cursor: pointer;
    }
  }
}
    </style>
        <div class="form">
          <h1>Masukkan Data Buku</h1>
          <form id="contact" action="" method="post">
            <div class="form-control">
              <label for="judul">Judul :</label>
              <input
                placeholder="Judul"
                type="text"
                name="judul" id="judul"
                required
                autofocus
              />
            </div>
            <div class="form-control">
              <label for="kategori">Kategori :</label>
              <select name="kategori" id="kategori">
                <option value="Religi">Religi</option>
                <option value="Dongeng">Dongeng</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Lainnya">Lainnya</option>
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
              ></textarea>
            </div>
            <div class="form-control">
              <label for="penulis">Penulis :</label>
              <input placeholder="Penulis" name="penulis" id="penulis" type="text" required />
            </div>
            <div class="form-control">
              <label for="image_url">Image url :</label>
              <input
                placeholder="Image_url"
                name="image_url" id="image_url"
                type="file"
                required
              />
            </div>
            <div class="form-control">
              <label for="read_url">Read url :</label>
              <input placeholder="Read Url" name="read_url" id="read_url" type="text" required />

            </div>
            <div class="form-control">
              <button
                class="submit">Submit</button>
            </div>
          </form>
        </div>
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

export default TambahBuku;
