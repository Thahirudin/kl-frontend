const TentangKami = {
  async render() {
    return `
    <style>
      .tentang_kids {
        max-width: 1200px;
        width: 90%;
        margin: 4rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        .tentang_kids_title {
          margin-bottom: 2rem;
          color: #0284c7;
        }
        img {
          width: 100%;
        }
      }
      .team {
        max-width: 1200px;
        width: 90%;
        margin: 4rem auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .team_title {
          color: #0284c7;
        }
        .team_member {
          display: grid;
          gap: 2rem;
          justify-content: space-between;
          grid-template-columns: repeat(1, 1fr);
          .team_card {
            padding: 1rem;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 1rem;
            height: 100%;
            box-shadow: 0 0 8px 0 rgb(0 0 0 / 0.25);
            .team_card_img {
              margin-bottom: 1rem;
            }
            .team_card_name h2 {
              font-size: 20px;
            }
            img {
              width: 100%;
              object-fit: cover;
              height: 300px;
              border-radius: 1rem;
            }
          }
        }
      }
      @media screen and (min-width: 768px) {
        .tentang_kids {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          .tentang_kids_img {
            width: 30%;
          }
          .tentang_kids_text {
            width: 70%;
          }
        }
        .team {
          .team_title {
            text-align: center;
          }
          .team_member {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      }
      @media screen and (min-width: 1200px) {
        .tentang_kids {
          margin: 8rem auto;
        }
        .team {
          margin: 8rem auto;

          .team_member {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      }

    </style>
      <section>
        <div class="tentang_kids">
          <div class="tentang_kids_img">
            <img src="./logo/logo.png" alt="logo">
          </div>
          <div class="tentang_kids_text">
            <div class="tentang_kids_title">
              <h1>Tentang Kids Library</h1>
            </div>
            <div class="tentang_kids_description">
              <p>Kids Library adalah inisiatif untuk meningkatkan Sumber Daya Manusia Berkualitas melalui bahan bacaan platform digital. Untuk meningkatkan akses terhadap literatur anak-anak berkualitas, yang dapat mempengaruhi perkembangan intelektual dan kreatifitas.</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="team">
          <div class="team_title"><h1>Team Kami</h1></div>
          <div class="team_description">Kami adalah sekelompok mahasiswa Indonesia yang berfokus dalam dunia software developer khususnya dalam bidang Front-End dan Back End. Misi perpustakaan anak adalah membantu meningkatkan literasi pada anak-anak melalui penyediaan akses yang mudah terhadap buku dan sumber daya pendidikan yang menarik, serta menyelenggarakan program-program yang mendukung pengembangan keterampilan membaca, pemahaman, dan imajinasi kreatif.</div>
          <div class="team_member">
            <div class="team_card">
              <div class="team_card_img"><img src="./img/thahirudin.jpg" alt="Angga"></div>
              <div class="team_card_name"><h2>Angga Cahyo krisnanto</h2></div>
            </div>
            <div class="team_card">
              <div class="team_card_img"><img src="./img/thahirudin.jpg" alt="Farhan"></div>
              <div class="team_card_name"><h2>Farhan Putra Bunga Mayang</h2></div>
            </div>
            <div class="team_card">
              <div class="team_card_img"><img src="./img/thahirudin.jpg" alt="Thahirudin"></div>
              <div class="team_card_name"><h2>Thahirudin</h2></div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default TentangKami;
