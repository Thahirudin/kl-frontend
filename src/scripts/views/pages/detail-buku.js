import { jwtDecode } from 'jwt-decode';
import UrlParser from '../../routes/url-parser';
import KidsLibraryDbSource from '../../data/kidslibrarydb-source';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import isUserLoggedIn from '../../utils/auth';
import { createBukuDetailTemplate } from '../templates/template-creator';

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
        .card_detail{
          margin: 1rem 0;
        }
        h2 {
          margin: 1rem 0;
          font-size: 22px;
          font-weight: 700;
        }
      }
      @media screen and (min-width: 768px) {
        .buku_container{
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          .buku_img{
            width: 40%;
          }
          .buku_body{
            width: 60%;
          }
        }
      }
    </style>
      <section id="buku">
        
      </section>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    if (!isUserLoggedIn()) {
      window.location.href = '#/masuk'; // Alihkan ke halaman login jika belum login
      return;
    }
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const buku = await KidsLibraryDbSource.getBukuById(url.id);
    const bukuContainer = document.querySelector('#buku');
    bukuContainer.innerHTML = createBukuDetailTemplate(buku);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      buku: {
        id: url.id,
      },
      userId: decodedToken.id,
    });
  },
};

export default DetailBuku;
