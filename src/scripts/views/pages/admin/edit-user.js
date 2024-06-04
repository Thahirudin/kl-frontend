const EditUser = {
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
      }
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
    </style>

      <div class="form">
          <h1>Edit User</h1>
          <form id="contact" action="" method="post">
            <div class="form-control">
              <label for="nama">Nama :</label>
              <input
                placeholder="Nama"
                type="text"
                name="nama"
                id="nama"
                required
                autofocus
              />
            </div>
            <div class="form-control">
              <label for="email">Email :</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                required
                autofocus
              />
            </div>
            <div class="form-control">
              <label for="tanggal_lahir">Tanggal Lahir :</label>
              <input
                placeholder="Tanggal Lahir"
                type="date"
                name="tanggal_lahir"
                id="tanggal_lahir"
                required
                autofocus
              />
            </div>
            <div class="form-control">
              <label for="jenis_kelamin">Jenis Kelamin :</label>
              <select name="jenis_kelamin" id="jenis_kelamin">
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div class="form-control">
              <label for="profil">Profil :</label>
              <input
                placeholder="Image_Url"
                type="file"
                name="profil"
                id="profil"
                required
                autofocus
              />
            </div>
            <div class="form-control">
              <label for="penulis">Username :</label>
              <input
                placeholder="Username"
                name="username"
                id="username"
                type="text"
                required
              />
            </div>
            <div class="form-control">
              <label for="password">Password :</label>
              <input
                placeholder="Password "
                name="password"
                id="password"
                type="password"
                required
              />
            </div>
            <div class="form-control">
              <button class="submit">Submit</button>
            </div>
          </form>
        </div>
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

export default EditUser;
