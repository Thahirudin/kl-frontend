import LikeButtonInitiator from '../../utils/like-button-initiator';

const DetailBuku = {
  async render() {
    return `
    <style>
        .buku_container {
  background: url("https://buku.kemdikbud.go.id/assets/image/catalog/Background.png") 100% 100%;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 2rem;
  width: 90%;
  margin: 4rem auto;
  border-radius: 2rem;
  max-width: 1200px;
  color: #1e293b;
}
.buku_img img {
  width: 100%;
  border-radius: 1rem;
  margin: 3rem 0;
}
h1 {
  margin-bottom: 2rem;
  font-weight: 800;
}
.buku_url a {
  display: inline-block;
  padding: 0.5rem 1rem;
  min-width: 44px;
  padding: 0.8rem 1rem;
  background-color: #0284c7;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
}
.buku_url a:hover {
  background-color: #38bdf8;
  transition: 0.7s ease-in-out;
}
.detail_buku {
  h2 {
    margin: 2rem 0;
    font-size: 22px;
    font-weight: 700;
  }
  .buku_table {
    overflow-x: auto;
    table,
    th,
    td {
      border: none;
      border-collapse: collapse;
    }
    table thead {
      background-color: #0284c7;
      color: white;
    }
    tr th,
    tr td {
      padding: 1rem;
    }
  }
}
@media screen and (min-width: 768px) {
  .buku_container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
}
@media screen and (min-width: 1200px) {
}
    </style>
     <div class="buku_container">
        <div class="buku_img">
          <img src="https://static.buku.kemdikbud.go.id/content/image/coverteks/coverkurikulum21/Matematika-BG-KLS-IV-cover.png" alt="gambar buku">
        </div>
        <div class="buku_body">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, alias?</h1>
          <div class="buku_url">
            <a href="#">Baca Buku</a>
          </div>
          <div class="detail_buku">
            <h2>Detail Buku</h2>
            <div class="buku_table">
              <table>
                <thead>
                  <tr>
                    <th>Penulis</th>
                    <th>Penerbit</th>
                    <th>ISBN</th>
                    <th>Halaman</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hobri, Susanto, Arika Indah Kristiana, Arif Fatahillah, Eko Waluyo, Ridho Alfarisi, Haris Setiya Budi, Moh. Iqbal Helmi</td>
                    <td>Gramedia</td>
                    <td>123456789</td>
                    <td>100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      buku: {
        id: 1,
      },
      userId: 1,
    });
  },
};

export default DetailBuku;
