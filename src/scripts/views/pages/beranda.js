const Beranda = {
  async render() {
    return `
      <section class="section_one">
        <div class="section_one_body">
          <div class="section_one_content">
            <div class="section_one_title">
              <h1>
                Tingkatkan Pengetahuanmu Bersama
                <span style="color: #facc15">Kids Library</span>
              </h1>
            </div>
            <div class="section_one_description">
              <p>
                Jelajahi koleksi buku kami yang dirancang khusus untuk anak-anak
                dari segala usia.
              </p>
            </div>
          </div>
          <div class="section_one_img">
            <img src="./img/buku.png" />
          </div>
        </div>
      </section>
      <section class="kenali">
        <div class="kenali_content">
          <div class="kenali_title">
            <h1>Kenali <span style="color: #0284c7">Kids Library</span></h1>
          </div>
          <div class="kenali_deskripsi">
            Kids Library adalah inisiatif untuk meningkatkan Sumber Daya Manusia
            Berkualitas melalui bahan bacaan platform digital. Untuk
            meningkatkan akses terhadap literatur anak-anak berkualitas, yang
            dapat mempengaruhi perkembangan intelektual dan kreatifitas.
          </div>
        </div>
      </section>
      <section class="reason">
        <div class="reason_body">
          <div class="reason_img">
            <img src="./img/reason.png" alt="image" />
          </div>
          <div class="reason_reason_content">
            <h1>Mengapa Harus Membaca Buku?</h1>
            <p>
              Membaca buku penting karena memperluas wawasan, meningkatkan
              keterampilan berpikir kritis, serta memiliki dampak positif pada
              kesejahteraan mental dan koneksi sosial. Dengan membaca, seseorang
              dapat menjelajahi dunia tanpa batas, menginspirasi diri, dan
              membuka pintu menuju penemuan baru.
            </p>
          </div>
        </div>
      </section>
      <section class="membaca">
        <div class="membaca_body">
          <div class="membaca_content">
            <h1>Ayo Mulai Membaca</h1>
            <p>
              Kids Library adalah inisiatif untuk meningkatkan Sumber Daya
              Manusia Berkualitas melalui bahan bacaan platform digital. Untuk
              meningkatkan akses terhadap literatur anak-anak berkualitas, yang
              dapat mempengaruhi perkembangan intelektual dan kreatifitas.
            </p>
            <div>
              <a href="#/buku">Ayo Mulai Membaca</a>
            </div>
          </div>
          <div class="membaca_img">
            <img src="./img/membaca.png" alt="image3" />
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default Beranda;
