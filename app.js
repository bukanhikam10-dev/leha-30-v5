const chapters = [
  { id: "prologue", number: "P", title: "Sebuah Hadiah untuk Leha", label: "PROLOG", summary: "Hadiah ulang tahun yang mengajak Leha memulai perjalanan dan menemukan petunjuk pertama.", playable: true },
  { id: "bab-1", number: "01", title: "Sebelum Kita Saling Mengenal", label: "BAB 1", summary: "Masa SMP Leha dan awal pertemanannya di SMAN 94, dengan narasi Hikam sebelum adegan sosial.", playable: true },
  { id: "bab-2", number: "02", title: "Modus yang Tidak Terlalu Halus", label: "BAB 2", summary: "Tawaran nebeng pulang sekolah dan perjalanan motor bersama." , playable: true },
  { id: "bab-3", number: "03", title: "Taruhan Es Krim", label: "BAB 3", summary: "Pertanyaan Maulid, taruhan batagor, dan traktiran es krim di Happy Days.", playable: true },
  { id: "bab-4", number: "04", title: "Di Barisan Penonton", label: "BAB 4", summary: "Dukungan Leha di kompetisi band dan perayaan juara pertama.", playable: true },
  { id: "bab-5", number: "05", title: "Dua Mimpi, Dua Arah", label: "BAB 5", summary: "Cita-cita Leha dan Hikam, serta dukungan yang mereka berikan satu sama lain.", playable: true },
  { id: "bab-6", number: "06", title: "Jalan yang Mulai Berbeda", label: "BAB 6", summary: "Setelah SMA, rutinitas berubah saat Leha mengejar UI dan Hikam kuliah di UIN.", playable: true },
  { id: "bab-7", number: "07", title: "Mbak Leha dari UI", label: "BAB 7", summary: "Kehidupan kampus Leha bersama Mentari dan Nadia.", playable: true },
  { id: "bab-8", number: "08", title: "Perempuan dengan Mimpi Besar", label: "BAB 8", summary: "Pengalaman profesional Leha dan kebanggaan Hikam.", playable: true },
  { id: "bab-9", number: "09", title: "3 Oktober", label: "BAB 9", summary: "Pertemuan kembali di selasar gedung FISIP bersama Wawaw.", playable: true },
  { id: "finale", number: "✦", title: "Untuk Leha, Hari Ini", label: "FINALE", summary: "Surat terakhir dari Hikam dan ending credit komedi.", playable: true },
];

const characters = [
  { id: "leha", name: "Leha", note: "Tokoh utama · versi sekolah", tag: "REFERENSI" },
  { id: "hikam", name: "Hikam", note: "Tokoh cerita · drummer", tag: "DRUMMER" },
  { id: "poniman", name: "Poniman", note: "Narator dan pemandu · sprite bintang", tag: "NARATOR" },
  { id: "aini", name: "Aini", note: "Teman sekolah · desain sementara", tag: "PROVISIONAL" },
  { id: "ayu", name: "Ayu", note: "Teman sekolah · desain sementara", tag: "PROVISIONAL" },
  { id: "pista", name: "Pista", note: "Teman sekolah · desain sementara", tag: "PROVISIONAL" },
  { id: "nurul", name: "Nurul", note: "Teman sekolah · desain sementara", tag: "PROVISIONAL" },
  { id: "anita", name: "Anita", note: "Teman sekolah · desain sementara", tag: "PROVISIONAL" },
  { id: "jawir", name: "Jawir", note: "Teman sekolah · perempuan", tag: "REFERENSI" },
  { id: "nadia", name: "Nadia", note: "Teman UI · berhijab", tag: "REFERENSI" },
  { id: "mentari", name: "Mentari", note: "Teman UI · berhijab", tag: "REFERENSI" },
  { id: "wawaw", name: "Wawaw", note: "Teman reuni · desain sementara", tag: "PROVISIONAL" },
  { id: "ibu-menteri", name: "Ibu Menteri", note: "Tokoh pendukung · desain sementara", tag: "PROVISIONAL" },
  { id: "jupe", name: "Mbak Jupe", note: "Rekan kerja Leha · desain sementara", tag: "PROVISIONAL" },
];

const games = {
  prologue: {
    title: "Sebuah hadiah untuk Leha",
    stages: [{
      id: "ruang-hadiah", eyebrow: "PROLOG · DRAFT ADEGAN", location: "RUANG HADIAH", mode: "prologue",
      intro: "Leha menerima sebuah game yang dibuat khusus untuknya. Bantu Leha melihat benda-benda yang tersembunyi di ruangan ini.",
      outro: "Semua benda di ruang hadiah sudah ditemukan. Perjalanan Leha akan dimulai dari masa sekolahnya.",
      objects: [
        { id: "hadiah", name: "Kotak hadiah", icon: "▣", clue: "Ada pita merah di dekat tepi meja." },
        { id: "bintang", name: "Bintang kecil", icon: "✦", clue: "Cahaya kecil berkelip di dekat jendela." },
        { id: "buku", name: "Buku catatan", icon: "▤", clue: "Sebuah buku terselip di depan monitor." },
        { id: "cangkir", name: "Cangkir", icon: "◡", clue: "Cari benda kecil di sebelah kanan meja." },
      ],
    }],
  },
  "bab-1": {
    title: "Sebelum Kita Saling Mengenal",
    stages: [
      {
        id: "smpn-205", eyebrow: "BAB 1 · MASA SMP", location: "KELAS SMPN 205", mode: "school-class", playMode: "explore",
        introSpeaker: "Poniman", intro: "Pada masa SMP, Leha menjalani hari-harinya bersama teman-teman sekolah. Perjalanan ini dimulai dari masa sekolah Leha sendiri.",
        outroSpeaker: "Poniman", outro: "Itulah masa SMP Leha. Berikutnya, perjalanan berlanjut ke SMAN 94, tempat Leha dan Hikam mulai berada di lingkungan yang sama.",
        objects: [],
      },
      {
        id: "sman-94", eyebrow: "BAB 1 · TRANSISI KE SMA", location: "GERBANG SMAN 94", mode: "school-gate", playMode: "explore",
        introSpeaker: "Poniman", intro: "Saat masuk SMAN 94, Leha memulai babak baru bersama teman-teman sekolahnya. Arahkan Leha melewati gerbang untuk melihat kesehariannya.",
        outroSpeaker: "Poniman", outro: "Dari gerbang, Leha masuk ke kesehariannya di sekolah. Gerakkan Leha mendekati teman-temannya untuk menyapa.",
        objects: [],
      },
      {
        id: "sman-94-class", eyebrow: "BAB 1 · DI KELAS", location: "KELAS SMAN 94", mode: "school-class", playMode: "social",
        introSpeaker: "Poniman", intro: "Di kelas, Leha bertemu Aini, Ayu, dan Anita. Gerakkan Leha mendekati mereka untuk mulai mengobrol.",
        outroSpeaker: "Poniman", outro: "Obrolan di kelas selesai. Leha melanjutkan hari sekolahnya ke kantin.", objects: [],
        friends: [
          { id: "aini", name: "Aini", left: 36, dialogue: [["Aini", "Leha, tugas yang tadi dicatat semua?"], ["Leha", "Hampir. Bagian terakhir boleh aku lihat catatanmu?"], ["Aini", "Boleh, nanti kita cocokkan bareng."]] },
          { id: "ayu", name: "Ayu", left: 57, dialogue: [["Ayu", "Leha, kamu sudah paham jadwal pelajaran hari ini?"], ["Leha", "Sudah, Yu. Kalau ada yang kelewat, nanti kita cek bareng, ya."], ["Ayu", "Siap! Nanti duduk bareng lagi, ya."]] },
          { id: "anita", name: "Anita", left: 79, dialogue: [["Anita", "Leha, nanti pas istirahat ikut ke kantin?"], ["Leha", "Ayo. Aku temani."], ["Anita", "Oke, ketemu di sana!"]] },
        ],
      },
      {
        id: "sman-94-canteen", eyebrow: "BAB 1 · JAM ISTIRAHAT", location: "KANTIN SMAN 94", mode: "school-canteen", playMode: "social",
        introSpeaker: "Poniman", intro: "Bel istirahat berbunyi. Di kantin, Leha bertemu Nurul, Pista, dan Anita. Gerakkan Leha mendekati mereka untuk menyapa.",
        outroSpeaker: "Poniman", outro: "Hari sekolah berlanjut dengan obrolan sederhana bersama teman-teman. Dari sini, kisah Leha dan Hikam akan bergerak ke bab berikutnya.", objects: [],
        friends: [
          { id: "nurul", name: "Nurul", left: 38, dialogue: [["Nurul", "Leha, biasanya kamu jajan apa kalau istirahat?"], ["Leha", "Tergantung suasana. Hari ini kayaknya cari yang segar."], ["Nurul", "Kalau begitu, kita lihat menu minumannya, yuk."]] },
          { id: "pista", name: "Pista", left: 59, dialogue: [["Pista", "Kantin ramai juga hari ini."], ["Leha", "Iya, untung kita masih dapat tempat."], ["Pista", "Sambil makan, cerita-cerita, yuk."]] },
          { id: "anita", name: "Anita", left: 80, dialogue: [["Anita", "Akhirnya ketemu lagi di kantin, Leha."], ["Leha", "Iya! Tadi aku janji mau ke sini."], ["Anita", "Janji ditepati. Nah, sekarang pilih jajanan!"]] },
        ],
      },
    ],
  },
};

Object.assign(games, {
  "bab-2": {
    title: "Modus yang Tidak Terlalu Halus",
    stages: [
      { id: "after-school-offer", eyebrow: "BAB 2 · PULANG SEKOLAH", location: "GERBANG SMAN 94", mode: "school-gate", playMode: "social", introSpeaker: "Poniman", intro: "Bel pulang berbunyi. Hikam menawarkan tumpangan kepada Leha dengan alasan menghemat ongkos.", outroSpeaker: "Poniman", outro: "Leha menerima ajakan Hikam. Sekarang mereka memulai perjalanan pulang dengan motor.", objects: [], friends: [{ id: "hikam", name: "Hikam", left: 66, dialogue: [["Hikam", "Udah pulang? Gue anterin, ya. Daripada keluar ongkos Gojek."], ["Leha", "Modus lo, Kam."], ["Hikam", "Ini namanya solusi hemat. Naik?"], ["Leha", "Ya udah, ayo."]] }] },
      { id: "ride-home", eyebrow: "BAB 2 · PERJALANAN PULANG", location: "JALAN PULANG", mode: "motor", playMode: "ride", introSpeaker: "Poniman", intro: "Leha dan Hikam mulai berkendara pulang. Nikmati perjalanan singkat mereka di jalan sore.", outroSpeaker: "Poniman", outro: "Perjalanan pulang Leha dan Hikam selesai. Ajakan sederhana itu menjadi salah satu kenangan masa sekolah mereka.", objects: [], activity: { duration: 8500 } },
      { id: "ride-reflection", eyebrow: "BAB 2 · MODUS TERBONGKAR", location: "PERJALANAN PULANG", mode: "motor", playMode: "story", introSpeaker: "Poniman", intro: "Alasan menghemat ongkos bukan satu-satunya hal yang dipikirkan Hikam.", outroSpeaker: "Poniman", outro: "Perjalanan sederhana itu membuka ruang bagi kenangan-kenangan berikutnya.", objects: [], script: [["Hikam", "Jujur, waktu itu gue pengen bisa pulang bareng lo."], ["Hikam", "Gue emang pengen bisa pergi bareng lo."], ["Leha", "Masih aja cari alasan, Kam."]] },
    ],
  },
  "bab-3": {
    title: "Taruhan Es Krim",
    stages: [
      { id: "maulid-bet", eyebrow: "BAB 3 · TARUHAN", location: "LINGKUNGAN SEKOLAH", mode: "school-class", playMode: "story", introSpeaker: "Poniman", intro: "Satu pertanyaan Leha tentang Maulid berubah menjadi taruhan kecil yang menguntungkan Hikam.", outroSpeaker: "Poniman", outro: "Leha menerima taruhan itu. Bantu Leha membuka kalender untuk mengetahui hari Maulid.", objects: [], script: [["Leha", "Emang Maulid hari Jumat apa Kamis?"], ["Hikam", "Kamis."], ["Leha", "Boong lu yak?"], ["Hikam", "Kalo bener beliin gua batagor lu yak."], ["Leha", "Yeeeh masa gitu."], ["Hikam", "Kalo gua salah gua traktir es krim."], ["Leha", "Okeee."]] },
      { id: "calendar-reveal", eyebrow: "BAB 3 · JAWABAN", location: "KALENDER SEKOLAH", mode: "calendar", playMode: "reveal", introSpeaker: "Poniman", intro: "Periksa tanggal Maulid untuk membuka hasil taruhannya.", outroSpeaker: "Poniman", outro: "Hikam menjawab salah dengan sengaja. Ia ingin memiliki alasan untuk mengajak Leha ke Happy Days dan mentraktirnya es krim.", objects: [], activity: { label: "Buka kalender", prompt: "Hari yang benar ternyata Jumat. Hikam menjawab Kamis dengan sengaja.", doneText: "Jawaban terbuka: Hikam memang sengaja salah." } },
      { id: "happy-days", eyebrow: "BAB 3 · HAPPY DAYS", location: "HAPPY DAYS", mode: "happy-days", playMode: "story", introSpeaker: "Poniman", intro: "Leha dan Hikam pergi ke Happy Days. Mereka menghabiskan waktu dengan mengobrol dan tertawa bersama.", outroSpeaker: "Poniman", outro: "Berikutnya, Leha datang untuk mendukung band Hikam.", objects: [], script: [["Hikam", "Sebenernya waktu itu aku sengaja kalah supaya bisa jalan sama kamu."], ["Leha", "Jadi dari awal memang udah direncanakan?"], ["Hikam", "Kurang lebih. Tapi es krimnya beneran gue traktir."]] },
    ],
  },
  "bab-4": {
    title: "Di Barisan Penonton",
    stages: [
      { id: "before-show", eyebrow: "BAB 4 · SEBELUM TAMPIL", location: "AREA KOMPETISI BAND", mode: "concert", playMode: "story", introSpeaker: "Poniman", intro: "Pada hari kompetisi band di SMAN 2 Tangerang, Leha datang untuk menonton penampilan Hikam.", outroSpeaker: "Poniman", outro: "Sekarang waktunya tampil. Poniman memandu: tekan kiri dan kanan mengikuti pola drum.", objects: [], script: [["Leha", "Keren keren akhirnya gua bisa nonton lu."], ["Hikam", "Jelas dong, siapa dulu hahaha."], ["Hikam", "Makasih ya udah mau nonton gua."], ["Leha", "Okaai semoga sukses."]] },
      { id: "drum-rhythm", eyebrow: "BAB 4 · PENAMPILAN", location: "PANGGUNG KOMPETISI", mode: "concert", playMode: "rhythm", introSpeaker: "Poniman", intro: "Hikam bersiap memainkan drum di panggung. Poniman memandu: tekan tombol kiri dan kanan mengikuti pola yang tampil.", outroSpeaker: "Poniman", outro: "Penampilan selesai. Saatnya menunggu pengumuman.", objects: [], activity: { sequence: ["left", "right", "left", "left", "right", "left"] } },
      { id: "first-place", eyebrow: "BAB 4 · JUARA PERTAMA", location: "PANGGUNG KOMPETISI", mode: "concert", playMode: "story", introSpeaker: "Poniman", intro: "Band Hikam meraih juara pertama. Leha menghampirinya setelah pengumuman.", outroSpeaker: "Poniman", outro: "Setelah suasana panggung yang ramai, kenangan berlanjut ke momen sederhana di Alas Tua.", objects: [], script: [["Leha", "Cieee juara 1."], ["Hikam", "Aaa seneng banget guaa."], ["Hikam", "Sini tos—"], ["Poniman", "Hikam dan Leha mulai bergerak seolah akan berpelukan..."], ["Poniman", "Plot twist: boong! Mereka tertawa dan kembali berdiri berdampingan."]] },
      { id: "alas-tua", eyebrow: "BAB 4 · SETELAH KOMPETISI", location: "ALAS TUA", mode: "alas-tua", playMode: "story", introSpeaker: "Poniman", intro: "Setelah kompetisi, Leha dan Hikam mampir ke Alas Tua. Momen sederhana itu menjadi bagian dari kenangan mereka.", outroSpeaker: "Poniman", outro: "Dari momen kecil itu, perjalanan beralih ke mimpi-mimpi yang pernah Leha dan Hikam bagi.", objects: [], script: [["Hikam", "Kadang yang gue ingat bukan cuma acara besarnya."], ["Hikam", "Hal sederhana setelahnya juga ikut nempel di kepala."]] },
    ],
  },
  "bab-5": {
    title: "Dua Mimpi, Dua Arah",
    stages: [
      { id: "two-dreams", eyebrow: "BAB 5 · AKHIR MASA SMA", location: "RUANG KELAS · MENJELANG KELULUSAN", mode: "dreams", playMode: "story", introSpeaker: "Poniman", intro: "Menjelang akhir masa SMA, Leha dan Hikam berbagi cerita tentang masa depan.", outroSpeaker: "Poniman", outro: "Saat itu, Leha dan Hikam belum tahu ke mana jalan masing-masing akan membawa mereka.", objects: [], script: [["Leha", "Aku pengen jadi Menteri Pemberdayaan Perempuan."], ["Hikam", "Waktu lo bilang itu, gue mikir: keren banget."], ["Hikam", "Gue sendiri pengen masuk STIS."], ["Leha", "Semoga berhasil ya, Kam. Aku dukung."], ["Hikam", "Makasih. Walaupun akhirnya gue nggak berhasil masuk, dukungan lo tetap gue inget."]] },
    ],
  },
  "bab-6": {
    title: "Jalan yang Mulai Berbeda",
    stages: [
      { id: "graduation", eyebrow: "BAB 6 · SETELAH SMA", location: "KENANGAN KELULUSAN", mode: "graduation", playMode: "story", introSpeaker: "Poniman", intro: "Setelah lulus SMA, rutinitas Leha dan Hikam mulai berubah.", outroSpeaker: "Poniman", outro: "Leha dan Hikam tetap saling tahu kabar, meski tak sesering dulu.", objects: [], script: [["Hikam", "Lulus sekolah bikin hari-hari kami mulai punya arah sendiri."], ["Hikam", "Gue kuliah di UIN. Leha fokus mengejar UI."], ["Hikam", "Nggak ada pertengkaran besar. Hidup saja yang mulai sibuk."]] },
      { id: "different-routines", eyebrow: "BAB 6 · RUTINITAS BARU", location: "POTONGAN WAKTU", mode: "daily-life", playMode: "story", introSpeaker: "Poniman", intro: "Hari-hari Leha dan Hikam dipenuhi jadwal kuliah dan kegiatan baru. Mereka sesekali bertukar kabar.", outroSpeaker: "Poniman", outro: "Lalu Hikam mendengar kabar baik tentang Leha.", objects: [], script: [["Hikam", "Kadang kami masih sempat ketemu."], ["Hikam", "Tapi nggak sesering dulu. Kami sama-sama punya hal yang sedang dikejar."]] },
      { id: "accepted-ui", eyebrow: "BAB 6 · KABAR BAIK", location: "KABAR TENTANG UI", mode: "phone", playMode: "story", introSpeaker: "Poniman", intro: "Hikam menerima kabar bahwa Leha berhasil masuk UI.", outroSpeaker: "Poniman", outro: "Leha berhasil masuk UI. Perjalanan kampusnya segera dimulai.", objects: [], script: [["Hikam", "Terus gue dengar kabar Leha berhasil masuk UI."], ["Hikam", "Gue ikut senang. Mimpinya terus jalan."]] },
    ],
  },
  "bab-7": {
    title: "Mbak Leha dari UI",
    stages: [
      { id: "phone-post", eyebrow: "BAB 7 · KABAR DARI UI", location: "UNGGAHAN DI PONSEL", mode: "phone", playMode: "story", introSpeaker: "Poniman", intro: "Suatu hari, Hikam melihat unggahan Leha yang mulai menjalani kehidupan kampus.", outroSpeaker: "Poniman", outro: "Dari layar ponsel, cerita beralih ke hari-hari Leha di UI.", objects: [], script: [["Hikam", "Mantan gue nihhh."], ["Hikam", "Bangga banget gue lihat lo sampai di sini, Leha."]] },
      { id: "ui-campus", eyebrow: "BAB 7 · KEHIDUPAN KAMPUS", location: "KAMPUS UI", mode: "campus", playMode: "social", introSpeaker: "Poniman", intro: "Di UI, Leha menjalani kegiatan kampus dan menghabiskan waktu bersama Mentari dan Nadia. Gerakkan Leha untuk menyapa mereka.", outroSpeaker: "Poniman", outro: "Hikam turut senang melihat Leha membangun dunianya sendiri.", objects: [], friends: [
        { id: "mentari", name: "Mentari", left: 59, dialogue: [["Mentari", "Leha, habis ini mau belajar di perpus atau ikut kegiatan organisasi?"], ["Leha", "Kita belajar dulu sebentar, habis itu lihat kegiatan organisasi, yuk."], ["Mentari", "Oke, jalan bareng!"]] },
        { id: "nadia", name: "Nadia", left: 80, dialogue: [["Nadia", "Mbak Leha, nanti duduk bareng kami di perpustakaan, ya."], ["Leha", "Boleh, aku ikut."], ["Nadia", "Siap. Nanti kita lanjut cerita di sana."]] },
      ] },
    ],
  },
  "bab-8": {
    title: "Perempuan dengan Mimpi Besar",
    stages: [
      { id: "professional-life", eyebrow: "BAB 8 · PERJALANAN PROFESIONAL", location: "LINGKUNGAN KERJA", mode: "office", playMode: "story", introSpeaker: "Poniman", intro: "Cita-cita yang pernah diceritakan Leha terus membawanya ke pengalaman baru.", outroSpeaker: "Poniman", outro: "Poniman melihat Hikam bangga saat Leha terus berkembang dan menjalani jalannya sendiri.", objects: [], script: [["Hikam", "Gue lihat kabar Leha magang di DPR. Keren banget."], ["Hikam", "Mimpi yang dulu ia ceritakan terus ia perjuangkan."]] },
      { id: "ibu-menteri", eyebrow: "BAB 8 · SEBUAH PERTEMUAN", location: "RUANG KERJA", mode: "office", playMode: "social", introSpeaker: "Poniman", intro: "Di ruang kerja, Leha menunggu kedatangan Ibu Menteri Kependudukan dan Pembangunan Keluarga. Sapa Mbak Jupe dulu, lalu temui Ibu Menteri.", outroSpeaker: "Poniman", outro: "Berikutnya, perjalanan membawa Leha, Hikam, dan Wawaw bertemu kembali di Noto Coffee.", objects: [], friends: [
        { id: "jupe", name: "Mbak Jupe", left: 30, dialogue: [["Mbak Jupe", "Leh, udah ketemu Ibu buat minta tanda tangan?"], ["Leha", "Iya nanti kalo Ibu udah sampe, gue mau langsung temuin dia."], ["Leha", "Eh mesen Gacoan yuk, lagi pengen udang keju gue."], ["Mbak Jupe", "Gass, yaudah pake Shopee lu yak!"]] },
        { id: "ibu-menteri", name: "Ibu Menteri", left: 72, requires: "jupe", requiresHint: "Ngobrol dulu sama Mbak Jupe sebelum menemui Ibu Menteri.", dialogue: [["Leha", "Ibu ini ada beberapa surat yang perlu ditanda tangani."], ["Ibu Menteri", "Oh oke."], ["Leha", "Oiya bu nanti sore kita ada meeting di Gedung Kopti, keperluan ibu udah saya siapkan."], ["Ibu Menteri", "Oke makasih, bilang ke driver ya."], ["Leha", "Baik, Bu."]] },
      ] },
    ],
  },
  "bab-9": {
    title: "3 Oktober",
    stages: [
      { id: "fisip-reunion", eyebrow: "BAB 9 · 3 OKTOBER", location: "NOTO COFFEE", mode: "noto", playMode: "social", introSpeaker: "Poniman", intro: "Pada 3 Oktober, Leha, Hikam, dan Wawaw bertemu kembali di Noto Coffee.", outroSpeaker: "Poniman", outro: "Setelah berbincang bertiga, Leha dan Hikam melanjutkan obrolan berdua.", objects: [], friends: [
        { id: "wawaw", name: "Wawaw", left: 36, dialogue: [["Wawaw", "Akhirnya bisa kumpul bertiga lagi."], ["Leha", "Iya, senang akhirnya kita bisa ketemu lagi."], ["Wawaw", "Kalian ngobrol santai aja. Senang bisa lihat kalian dekat lagi."]] },
        { id: "hikam", name: "Hikam", left: 68, dialogue: [["Hikam", "Rasanya sudah lama kita nggak duduk bareng begini."], ["Leha", "Iya. Banyak cerita yang kelewat."], ["Hikam", "Nanti kita cerita satu-satu, ya."]] }
      ] },
      { id: "closeness-again", eyebrow: "BAB 9 · SETELAH BERTEMU", location: "NOTO COFFEE", mode: "noto", playMode: "story", introSpeaker: "Poniman", intro: "Pertemuan itu membuat sesuatu terasa dekat lagi.", outroSpeaker: "Poniman", outro: "Perjalanan panjang mengantar Leha dan Hikam kembali pada momen yang berarti.", objects: [], script: [["Hikam", "Setelah hari itu, gue merasa kita dekat lagi."], ["Leha", "Aku juga ngerasain hal yang sama."], ["Hikam", "Gue bersyukur bisa ketemu lo lagi, Leha."]] },
    ],
  },
  finale: {
    title: "Untuk Leha, Hari Ini",
    stages: [
      { id: "final-letter-delivery", eyebrow: "FINALE · SURAT UNTUK LEHA", location: "HARI ULANG TAHUN LEHA", mode: "birthday", playMode: "story", introSpeaker: "Poniman", intro: "Di hari ulang tahun Leha, Hikam membawa sebuah surat. Dekati Hikam untuk menerimanya.", outroSpeaker: "Poniman", outro: "", objects: [], script: [["Hikam", "Leha, sebelum semuanya selesai, gue mau kasih sesuatu."], ["Leha", "Surat? Buat gue?"], ["Hikam", "Iya. Baca sampai selesai, ya."], ["Leha", "Oke, Kam. Makasih."]] },
      { id: "final-letter-reading", eyebrow: "FINALE · ISI SURAT", location: "SURAT DARI HIKAM", mode: "birthday", playMode: "letter", introSpeaker: "Poniman", intro: "Leha membuka surat dari Hikam. Inilah pesan terakhir sebelum credit penutup.", outroSpeaker: "Poniman", outro: "", objects: [], activity: { letter: "Leha,\n\nGue bikin game ini bukan karena masa lalu harus diulang, tapi karena ada banyak hal kecil yang sampai sekarang masih gue simpan. Dari pulang sekolah, taruhan es krim, sampai hari-hari waktu lo cerita tentang mimpi lo.\n\nGue bangga melihat cara lo terus melangkah. Semoga suatu hari nanti, lo sampai di tempat yang dulu lo bayangkan. Apa pun jalannya, jangan pernah meremehkan sejauh apa lo sudah berjalan.\n\nSelamat ulang tahun. Terima kasih sudah jadi bagian dari cerita ini.\n\n- Hikam" } },
      { id: "final-credits", eyebrow: "ENDING CREDITS", location: "SEBUAH HADIAH UNTUK LEHA", mode: "birthday", playMode: "credits", introSpeaker: "Poniman", intro: "", outroSpeaker: "Poniman", outro: "", objects: [], activity: { credits: [{ role: "DEVELOPER", name: "Hikam" }, { role: "SCRIPT", name: "Hikam" }, { role: "SOUND DESIGN", name: "Hikam" }, { role: "VISUAL DESIGN", name: "Hikam" }, { role: "GAME DESIGN", name: "Hikam" }, { role: "PRODUCER", name: "Hikam" }, { role: "THE MAN WHO LUCKY HAVE LEHA:", name: "Hikam", final: true }] } }
    ],
  },
});

const storageKey = "untuk-leha-prototype-v3";
let state = loadState();
let selectedChapter = chapters[0];
let activeChapter = chapters[0];
let stageIndex = 0;
let narrationPhase = "intro";
let selectedCharacterId = "leha";
let toastTimer;
let playerPosition = { x: 0.5, y: 0.76 };
let nearbyObjectId = null;
let nearbyFriendId = null;
let activeConversation = null;
let activeScript = null;
let movementTimer;
let sceneTimer;
let typingTimer = null;
let typingTarget = null;
let typingContent = "";
let typingIndex = 0;
let typingCallback = null;
let loadingFrame = 0;
let sfxContext = null;
let lastStepSfxAt = 0;

const portraitAliases = { "mbak jupe": "jupe", "mbak-jupe": "jupe", narator: "hikam" };
function portraitFor(speaker) {
  const key = String(speaker).toLowerCase().trim();
  return portraitAliases[key] || portraitAliases[key.replaceAll(" ", "-")] || key.replaceAll(" ", "-");
}

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function clearTypingText() {
  if (typingTimer) window.clearInterval(typingTimer);
  typingTimer = null;
  if (typingTarget) typingTarget.classList.remove("is-typing");
  typingTarget = null;
  typingCallback = null;
}
function finishTypingText() {
  if (!typingTimer) return false;
  const target = typingTarget, content = typingContent, callback = typingCallback;
  clearTypingText();
  if (target) target.textContent = content;
  if (callback) callback();
  return true;
}
function startTypingText(target, content, callback = null, speed = 22) {
  clearTypingText();
  const chars = Array.from(content);
  typingTarget = target; typingContent = content; typingIndex = 0; typingCallback = callback;
  target.textContent = ""; target.classList.add("is-typing");
  if (!chars.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = content; clearTypingText(); if (callback) callback(); return;
  }
  typingTimer = window.setInterval(() => {
    typingIndex += 1; target.textContent = chars.slice(0, typingIndex).join("");
    if (typingIndex >= chars.length) finishTypingText();
  }, speed);
}
function playSfx(kind = "ui") {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!sfxContext) sfxContext = new AudioContextClass();
    const makeTone = () => {
      const now = sfxContext.currentTime;
      if (kind === "step" && now - lastStepSfxAt < 0.095) return;
      if (kind === "step") lastStepSfxAt = now;
      const oscillator = sfxContext.createOscillator(), gain = sfxContext.createGain();
      const isStep = kind === "step", isDrum = kind === "drum";
      const duration = isStep ? 0.11 : isDrum ? 0.15 : 0.11;
      oscillator.type = isStep ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(isStep ? 205 : isDrum ? 155 : 760, now);
      oscillator.frequency.exponentialRampToValueAtTime(isStep ? 105 : isDrum ? 68 : 430, now + (isStep ? 0.085 : isDrum ? 0.12 : 0.075));
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(isStep ? 0.10 : isDrum ? 0.13 : 0.075, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain); gain.connect(sfxContext.destination);
      oscillator.start(now); oscillator.stop(now + duration + 0.01);
    };
    if (sfxContext.state === "suspended") sfxContext.resume().then(makeTone).catch(() => {});
    else makeTone();
  } catch (_) { /* Optional when browser audio is unavailable. */ }
}
function startLoadingSequence() {
  if (loadingFrame) cancelAnimationFrame(loadingFrame);
  const bar = $("#loading-bar"), percent = $("#loading-percent"), button = $("#loading-continue"), status = $("#loading-status");
  const duration = 4800, startedAt = performance.now();
  bar.style.width = "0%"; percent.textContent = "0%"; button.disabled = true;
  status.textContent = "MENYIAPKAN PERJALANAN";
  const tick = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration), value = Math.floor(progress * 100);
    bar.style.width = `${value}%`; percent.textContent = `${value}%`;
    status.textContent = value < 35 ? "MENYIAPKAN PERJALANAN" : value < 72 ? "MEMUAT KARAKTER" : value < 100 ? "MENATA KENANGAN" : "SIAP DIMULAI";
    if (progress < 1) loadingFrame = requestAnimationFrame(tick);
    else { loadingFrame = 0; button.disabled = false; }
  };
  loadingFrame = requestAnimationFrame(tick);
}

function loadState() {
  try {
    const currentSave = localStorage.getItem(storageKey);
    const previousSave = localStorage.getItem("untuk-leha-prototype-v2");
    const saved = JSON.parse(currentSave || previousSave || localStorage.getItem("untuk-leha-prototype-v1") || "{}");
    if (!currentSave && previousSave) {
      return { foundByStage: {}, completeByStage: {}, completeByChapter: saved.completeByChapter || {}, interactionsByStage: {}, activityByStage: {} };
    }
    const foundByStage = saved.foundByStage || { "prologue/ruang-hadiah": saved.found || [] };
    const completeByStage = saved.completeByStage || (saved.complete ? { "prologue/ruang-hadiah": true } : {});
    const completeByChapter = saved.completeByChapter || (saved.complete ? { prologue: true } : {});
    return { foundByStage, completeByStage, completeByChapter, interactionsByStage: saved.interactionsByStage || {}, activityByStage: saved.activityByStage || {} };
  } catch {
    return { foundByStage: {}, completeByStage: {}, completeByChapter: {}, interactionsByStage: {}, activityByStage: {} };
  }
}

function saveState() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* local storage is optional */ }
}

function currentStage() { return games[activeChapter.id].stages[stageIndex]; }
function stageKey(stage = currentStage()) { return `${activeChapter.id}/${stage.id}`; }
function currentFound(stage = currentStage()) { return state.foundByStage[stageKey(stage)] || []; }
function currentInteractions(stage = currentStage()) { return state.interactionsByStage[stageKey(stage)] || []; }
function currentActivity(stage = currentStage()) {
  const key = stageKey(stage);
  if (!state.activityByStage[key]) state.activityByStage[key] = { index: 0, lane: 1, redStopped: false, visited: [], done: false };
  return state.activityByStage[key];
}
function isUnlocked(chapter) {
  const index = chapters.findIndex((item) => item.id === chapter.id);
  return index <= 0 || Boolean(state.completeByChapter[chapters[index - 1]?.id]);
}

function showScreen(id) {
  $$(".screen").forEach((screen) => {
    const active = screen.id === id;
    screen.hidden = !active;
    screen.classList.toggle("active", active);
  });
  window.Music?.forScreen(id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message, good = false) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.toggle("good", good);
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
}

function renderChapters() {
  const list = $("#chapter-list");
  list.innerHTML = "";
  chapters.forEach((chapter) => {
    const done = Boolean(state.completeByChapter[chapter.id]);
    const unlocked = isUnlocked(chapter);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `chapter-card${chapter.id === selectedChapter.id ? " selected" : ""}${done ? " complete" : ""}`;
    card.setAttribute("aria-pressed", String(chapter.id === selectedChapter.id));
    const status = done ? "SELESAI" : chapter.playable ? unlocked ? "SIAP DIMAINKAN" : "SELESAIKAN PROLOG DULU" : "PRATINJAU";
    card.innerHTML = `<span class="chapter-num">${chapter.number}</span><span class="chapter-text"><strong>${chapter.title}</strong><small>${status}</small></span>`;
    card.addEventListener("click", () => {
      selectedChapter = chapter;
      renderChapters();
      renderChapterDetail();
    });
    list.append(card);
  });
  const completeCount = Object.values(state.completeByChapter).filter(Boolean).length;
  $("#map-progress-count").textContent = `${completeCount} / ${chapters.length}`;
  $("#map-progress-bar").style.width = `${(completeCount / chapters.length) * 100}%`;
}

function renderChapterDetail() {
  const chapter = selectedChapter;
  const unlocked = isUnlocked(chapter);
  const done = Boolean(state.completeByChapter[chapter.id]);
  let action;
  if (!chapter.playable) action = `<button class="detail-action" id="chapter-action" type="button" disabled>Konten menyusul</button>`;
  else if (!unlocked) action = `<button class="detail-action" id="chapter-action" type="button" disabled>Selesaikan bab sebelumnya dulu</button>`;
  else action = `<button class="detail-action" id="chapter-action" type="button">${done ? "Mainkan lagi" : "Masuk ke bab"} →</button>`;
  const tag = !unlocked ? "TERKUNCI · IKUTI URUTAN CERITA" : chapter.playable ? "ADEGAN INTERAKTIF" : "RANCANGAN CERITA";
  $("#chapter-detail").innerHTML = `<div class="detail-top"><span class="detail-kicker">${chapter.label} · ${tag}</span><h2>${chapter.title}</h2><p>${chapter.summary}</p></div><div class="detail-bottom"><span>${chapter.playable ? done ? "PROGRES TERSIMPAN" : "DRAFT PROTOTIPE" : "PRATINJAU · BELUM DIBANGUN"}</span>${action}</div>`;
  $("#chapter-action")?.addEventListener("click", () => openGame(chapter));
}

function renderCharacterGallery() {
  const gallery = $("#character-gallery");
  gallery.innerHTML = "";
  characters.forEach((character) => {
    const card = document.createElement("article");
    card.className = "character-card";
    card.innerHTML = `<img src="assets/characters/${character.id}-idle.svg" alt="Sprite pixel art ${character.name}" loading="lazy" /><strong>${character.name}</strong><small>${character.tag} · ${character.note}</small>`;
    gallery.append(card);
  });
}

function stageFriends(stage) {
  if (stage.friends) return stage.friends;
  if (stage.playMode === "story" && stage.mode !== "motor" && stage.script?.some(([speaker]) => speaker === "Hikam")) {
    return [{ id: "hikam", name: "Hikam", left: 70, dialogue: stage.script }];
  }
  return [];
}

function renderSceneVisual(stage) {
  const scene = $("#scene");
  scene.setAttribute("aria-label", stage.mode === "prologue" ? "Ruang hadiah dengan meja komputer bergaya pixel art" : stage.mode === "school-class" || stage.mode === "calendar" ? `Ruang kelas ${stage.location} untuk dijelajahi` : stage.mode === "school-canteen" ? "Kantin SMAN 94 dengan teman-teman Leha" : "Gerbang sekolah SMA SMAN 94 untuk dijelajahi");
  scene.classList.toggle("school-mode", stage.mode.startsWith("school-"));
  scene.classList.toggle("gate-mode", stage.mode === "school-gate");
  scene.classList.toggle("school-canteen", stage.mode === "school-canteen");
  scene.classList.toggle("prologue-mode", stage.mode === "prologue");
  scene.classList.toggle("motor-mode", stage.mode === "motor");
  scene.classList.toggle("concert-mode", stage.mode === "concert");
  scene.classList.toggle("campus-mode", stage.mode === "campus");
  scene.classList.toggle("office-mode", stage.mode === "office");
  scene.classList.toggle("fisip-mode", stage.mode === "fisip");
  scene.classList.toggle("birthday-mode", stage.mode === "birthday");
  scene.classList.toggle("ending-letter-scene", stage.id === "final-letter-delivery");
  scene.classList.toggle("credits-scene", stage.playMode === "credits");
  window.Music?.set(stage.playMode === "credits" ? "credits" : "main");
  scene.classList.toggle("phone-mode", stage.mode === "phone");
  scene.classList.toggle("cafe-mode", stage.mode === "cafe");
  ["calendar", "happy-days", "alas-tua", "graduation", "daily-life", "noto"].forEach((mode) => scene.classList.toggle(`${mode}-mode`, stage.mode === mode));
  scene.classList.toggle("story-art-mode", stage.mode === "story-art");
  scene.classList.toggle("dreams-mode", stage.mode === "dreams");
  $$(".school-art, .dynamic-object, .friend-npc", scene).forEach((element) => element.remove());
  const staticHotspots = $$(".hotspot:not(.dynamic-object)", scene);
  if (stage.mode === "prologue") {
    staticHotspots.forEach((element) => element.hidden = false);
    window.SceneArt?.mount(scene, "prologue", stage);
    return;
  }
  staticHotspots.forEach((element) => element.hidden = true);
  const art = document.createElement("div");
  art.className = "school-art";
  if (stage.mode === "school-class") {
    art.innerHTML = `<div class="class-window"><span>✦</span></div><div class="class-board"><i>BAHASA · IPS · SEJARAH</i></div><div class="class-floor"></div><div class="class-desk desk-one"></div><div class="class-desk desk-two"></div><div class="class-desk desk-three"></div>${stage.playMode === "explore" ? '<div class="walk-destination">PINTU KELAS →</div>' : '<div class="class-sign">KELAS XI · SMAN 94</div>'}`;
  } else if (stage.mode === "school-gate") {
    art.innerHTML = `<div class="gate-sky"></div><div class="school-building"><span class="building-sign">SMA SMAN 94</span><i></i><b></b></div><div class="gate-pillar pillar-left"></div><div class="gate-pillar pillar-right"></div><div class="gate-bar"></div><div class="gate-bench"></div><div class="walk-destination">MASUK →</div>`;
  } else if (stage.mode === "school-canteen") {
    art.innerHTML = `<div class="canteen-back"><span>KANTIN</span></div><div class="canteen-counter"><i>JAJANAN HARI INI</i><b></b></div><div class="canteen-table table-one"></div><div class="canteen-table table-two"></div><div class="canteen-floor"></div>`;
  } else if (stage.mode === "motor") {
    art.innerHTML = `<div class="ride-sky"><span class="ride-sun"></span><span class="ride-cloud cloud-a"></span><span class="ride-cloud cloud-b"></span><div class="ride-horizon"><i></i><b></b><em></em></div></div><div class="ride-road"><span class="ride-road-edge"></span><span class="ride-lane lane-left"></span><span class="ride-lane lane-right"></span></div><div class="ride-bike"><span class="ride-wheel wheel-left"></span><span class="ride-wheel wheel-right"></span><span class="ride-frame"></span><span class="ride-rider rider-hikam"></span><span class="ride-rider rider-leha"></span></div><div class="ride-caption">PERJALANAN PULANG · SORE HARI</div>`;
  } else if (stage.mode === "dreams") {
    art.innerHTML = `<div class="dreams-window"><i></i><span>SENJA · RUANG KELAS</span></div><div class="dreams-board"><b>RENCANA MASA DEPAN</b><span>UI</span><i>STIS</i></div><div class="class-floor"></div><div class="class-desk desk-one"></div><div class="class-desk desk-three"></div><div class="dreams-paper">CITA-CITA</div>`;
  } else if (stage.mode === "calendar") {
    art.innerHTML = `<div class="class-window"><span>✦</span></div><div class="calendar-board"><header>KALENDER SEKOLAH</header><b>MAULID NABI</b><strong>JUMAT</strong><i>□　□　□　□　□</i></div><div class="class-floor"></div><div class="class-desk desk-one"></div><div class="class-sign">KELAS · PENGUMUMAN HARI LIBUR</div>`;
  } else if (stage.mode === "happy-days") {
    art.innerHTML = `<div class="happy-window"><span>HAPPY DAYS</span><i></i><b></b></div><div class="happy-wall-lights">✦　✧　✦</div><div class="happy-counter"></div><div class="happy-table"><span>🍨</span><i></i></div><div class="happy-floor"></div>`;
  } else if (stage.mode === "alas-tua") {
    art.innerHTML = `<div class="alas-window"><span>ALAS TUA</span></div><div class="alas-wall"></div><div class="alas-lamp"></div><div class="alas-table"></div><div class="alas-chair chair-a"></div><div class="alas-chair chair-b"></div><div class="alas-floor"></div>`;
  } else if (stage.mode === "graduation") {
    art.innerHTML = `<div class="graduation-sky"></div><div class="graduation-banner">SELAMAT ATAS KELULUSAN</div><div class="graduation-building"><i></i><i></i><i></i></div><div class="graduation-trees"></div><div class="graduation-ground"></div><div class="graduation-cap">✦</div>`;
  } else if (stage.mode === "daily-life") {
    art.innerHTML = `<div class="daily-split"><div class="daily-panel daily-uin"><span>UIN</span><i></i></div><div class="daily-panel daily-ui"><span>UI</span><i></i></div></div><div class="daily-calendar">KULIAH · KEGIATAN · KABAR</div><div class="daily-road"></div>`;
  } else if (stage.mode === "noto") {
    art.innerHTML = `<div class="noto-window"><i></i><b></b><span>NOTO COFFEE</span></div><div class="noto-shelf"><i></i><i></i><i></i><i></i></div><div class="noto-lamp lamp-a"></div><div class="noto-lamp lamp-b"></div><div class="noto-counter"></div><div class="noto-table table-a"><span>☕</span></div><div class="noto-table table-b"><span>☕</span></div><div class="noto-floor"></div>`;
  } else if (stage.mode === "concert") {
    art.innerHTML = `<div class="concert-lights"></div><div class="concert-curtain"></div><div class="concert-sign">SMAN 2 TANGERANG · KOMPETISI BAND</div><div class="concert-platform"></div><div class="concert-drum"><i></i><b></b><span></span></div><div class="concert-crowd">●　●　●　●　●　●　●　●　●</div>`;
  } else if (stage.mode === "phone") {
    art.innerHTML = `<div class="phone-background"></div><div class="phone-hand"></div><div class="phone-device"><div class="phone-status">12:08　●</div><div class="phone-social-head">leha · 1 jam</div><div class="phone-post"><img src="assets/characters/leha-idle.svg" alt="Ilustrasi Leha di unggahan media sosial" /><span>Hari baru, kampus baru ✨</span></div><div class="phone-actions">♡　♡　♡</div></div><div class="phone-caption">HIKAM MELIHAT UNGGAHAN LEHA</div>`;
  } else if (stage.mode === "campus") {
    art.innerHTML = `<div class="campus-sky"></div><div class="campus-building"><span>UNIVERSITAS INDONESIA</span><i></i><b></b></div><div class="campus-tree tree-left"></div><div class="campus-tree tree-right"></div><div class="campus-path"></div><div class="campus-sign">PERPUSTAKAAN · KEGIATAN KAMPUS</div>`;
  } else if (stage.mode === "office") {
    art.innerHTML = `<div class="office-wall"><span>RUANG KERJA</span></div><div class="office-window"></div><div class="office-desk"></div><div class="office-paper paper-a"></div><div class="office-paper paper-b"></div><div class="office-plant"></div>`;

  } else if (stage.mode === "birthday") {
    art.innerHTML = `<div class="birthday-glow"></div><div class="birthday-banner">SELAMAT ULANG TAHUN, LEHA</div><div class="birthday-table"></div><div class="memory-star">✦</div><div class="memory-confetti confetti-one">✧</div><div class="memory-confetti confetti-two">✦</div>`;
  } else if (stage.mode === "cafe") {
    art.innerHTML = `<div class="cafe-window"></div><div class="cafe-lamp"></div><div class="cafe-table"></div><div class="cafe-counter"><span>HAPPY DAYS</span></div>`;
  } else {
    art.innerHTML = `<div class="montage-sky"></div><div class="montage-path"></div><div class="montage-panel panel-one">KELULUSAN</div><div class="montage-panel panel-two">LANGKAH BARU</div><div class="montage-panel panel-three">MIMPI UI</div><div class="montage-stars">✦　✧　✦</div>`;
  }
  scene.append(art);
  window.SceneArt?.mount(scene, stage.mode, stage);
  if (stage.id === "final-letter-delivery") {
    const envelope = document.createElement("div"); envelope.className = "handover-letter";
    envelope.innerHTML = '<span>✉</span><small>UNTUK LEHA</small>'; scene.append(envelope);
  }
  if (stage.playMode === "credits") {
    const credits = document.createElement("div"); credits.className = "ending-credits";
    const entries = stage.activity.credits.map((entry) => `<p class="${entry.final ? "credit-final" : ""}"><small>${entry.role}</small><strong>${entry.name}</strong></p>`).join("");
    credits.innerHTML = `<div class="credits-roll"><div class="credits-content"><h2>UNTUK LEHA</h2><p class="credit-thanks">Sebuah cerita tentang perjalanan, mimpi, dan orang-orang yang berarti.</p>${entries}<p class="credit-end">TERIMA KASIH SUDAH BERMAIN</p></div></div>`; scene.append(credits);
    const roll = $(".credits-content", credits);
    const finishCredits = () => {
      const activity = currentActivity(stage); activity.done = true; saveState();
      if (stage.playMode === "credits" && currentStage() === stage) { $("#stage-next").hidden = false; setNextLabel(stage); $("#stage-next").textContent = "Selesaikan Finale →"; }
    };
    window.requestAnimationFrame(() => {
      const viewHeight = credits.clientHeight || 420, contentHeight = roll.scrollHeight || 900;
      roll.style.setProperty("--credits-from", `${viewHeight}px`);
      roll.style.setProperty("--credits-to", `${-contentHeight}px`);
      roll.style.animationDuration = `${Math.max(18, Math.round((viewHeight + contentHeight) / 38))}s`;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { roll.style.animation = "none"; roll.style.transform = "translateY(0)"; finishCredits(); }
    });
    roll.addEventListener("animationend", finishCredits);
  }
  stageFriends(stage).forEach((friend) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "friend-npc";
    button.dataset.friend = friend.id;
    button.style.left = `${friend.left}%`;
    button.setAttribute("aria-label", `Sapa ${friend.name}`);
    button.innerHTML = `<img src="assets/characters/${friend.id}-idle.svg" alt="" /><span>${friend.name}</span>`;
    if (currentInteractions(stage).includes(friend.id)) button.classList.add("talked");
    scene.append(button);
  });
  stage.objects.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `hotspot dynamic-object school-object school-object-${index + 1}`;
    button.dataset.item = item.id;
    button.setAttribute("aria-label", `Cari ${item.name}`);
    button.innerHTML = `<span>${item.icon}</span>`;
    scene.append(button);
  });
}

function renderActivity(stage) {
  const panel = $("#activity-panel");
  const actions = $("#activity-actions");
  const activity = currentActivity(stage);
  actions.innerHTML = "";
  panel.hidden = false;
  panel.classList.toggle("letter-reading", stage.playMode === "letter");
  if (stage.playMode === "ride") {
    $("#activity-title").textContent = "PERJALANAN MOTOR";
    $("#activity-text").textContent = activity.done ? "Leha dan Hikam sudah sampai." : "Leha dan Hikam sedang berkendara di jalan sore.";
  } else if (stage.playMode === "rhythm") {
    $("#activity-title").textContent = "IKUTI KETUKAN DRUM";
    $("#activity-text").textContent = activity.done ? "Pola drum berhasil dimainkan!" : `Ketukan ${activity.index + 1} / ${stage.activity.sequence.length} · ${stage.activity.sequence[activity.index] === "left" ? "kiri" : "kanan"}`;
  } else if (stage.playMode === "reveal") {
    $("#activity-title").textContent = stage.activity.label;
    $("#activity-text").textContent = activity.done ? stage.activity.doneText : stage.activity.prompt;
    if (!activity.done) addActivityButton("Buka kalender", () => { activity.done = true; saveState(); renderActivity(stage); });
  } else if (stage.playMode === "letter") {
    panel.classList.add("letter-reading");
    $("#activity-title").textContent = "SURAT UNTUK LEHA";
    $("#activity-text").textContent = activity.done ? stage.activity.letter : "Hikam menyerahkan surat itu kepada Leha. Tekan Buka surat untuk membacanya.";
    if (!activity.opened && !activity.done) addActivityButton("Buka surat", () => {
      activity.opened = true; activity.started = true; saveState(); actions.innerHTML = ""; $("#activity-text").textContent = "";
      startTypingText($("#activity-text"), stage.activity.letter, () => {
        activity.done = true; saveState();
        $("#stage-next").hidden = true;
        $("#scene-message").textContent = "Surat selesai dibaca. Credit penutup dimulai...";
        clearTimeout(sceneTimer); sceneTimer = window.setTimeout(advanceStage, 700);
      }, 18);
    });
    else if (activity.opened && !activity.done && !typingTimer) {
      startTypingText($("#activity-text"), stage.activity.letter, () => {
        activity.done = true; saveState();
        $("#stage-next").hidden = true;
        $("#scene-message").textContent = "Surat selesai dibaca. Credit penutup dimulai...";
        clearTimeout(sceneTimer); sceneTimer = window.setTimeout(advanceStage, 700);
      }, 18);
    }
  } else if (stage.playMode === "credits") {
    panel.hidden = true;
    $("#scene-message").textContent = "Terima kasih sudah memainkan Untuk Leha.";
  } else if (stage.playMode === "memory") {
    $("#activity-title").textContent = "POTONGAN KENANGAN";
    const memories = stage.activity.memories;
    $("#activity-text").textContent = memories.filter((item) => activity.visited.includes(item.id)).map((item) => item.text).join(" · ") || "Pilih kenangan untuk melihat kembali perjalanan.";
    memories.forEach((item) => addActivityButton(activity.visited.includes(item.id) ? `✓ ${item.label}` : item.label, () => {
      if (!activity.visited.includes(item.id)) activity.visited.push(item.id);
      activity.done = activity.visited.length === memories.length;
      saveState(); renderActivity(stage);
    }));
  }
  $("#stage-next").hidden = !activity.done;
  setNextLabel(stage);
  if (stage.playMode === "credits") { $("#stage-next").hidden = !activity.done; $("#stage-next").textContent = "Selesaikan Finale →"; }
  if (stage.playMode === "letter" && activity.done && stageIndex < games[activeChapter.id].stages.length - 1) {
    $("#stage-next").hidden = true;
    clearTimeout(sceneTimer); sceneTimer = window.setTimeout(advanceStage, 700);
  }
}
function addActivityButton(label, action) {
  const button = document.createElement("button"); button.type = "button"; button.className = "activity-button"; button.textContent = label; button.addEventListener("click", action); $("#activity-actions").append(button);
}
function setNextLabel(stage) {
  const lastStage = stageIndex === games[activeChapter.id].stages.length - 1;
  $("#stage-next").textContent = lastStage ? `Selesaikan ${activeChapter.label} →` : "Lanjut →";
}
function renderScriptLine() {
  if (!activeScript) return;
  const [speaker, text] = activeScript.lines[activeScript.index];
  $("#friend-dialogue-name").textContent = speaker;
  $("#friend-dialogue-role").textContent = speaker === "Poniman" ? "PONIMAN · PEMANDU" : "DIALOG ANTAR TOKOH";
  startTypingText($("#friend-dialogue-text"), text);
  $("#friend-dialogue-portrait").src = `assets/characters/${portraitFor(speaker)}-idle.svg`;
  $("#friend-dialogue-portrait").alt = `Potret ${speaker}`;
  $("#friend-dialogue-next").textContent = activeScript.index === activeScript.lines.length - 1 ? "Selesai ✓" : "Lanjut →";
  $("#friend-dialog").hidden = false;
}
function continueScript() {
  if (!activeScript) return;
  if (finishTypingText()) return;
  if (activeScript.index < activeScript.lines.length - 1) { activeScript.index++; renderScriptLine(); return; }
  activeScript = null; $("#friend-dialog").hidden = true;
  const stage = currentStage(); const activity = currentActivity(stage); activity.done = true; saveState();
  $("#stage-next").hidden = false; setNextLabel(stage);
  $("#scene-message").textContent = "Bagian cerita selesai. Tekan Lanjut untuk meneruskan.";
}
function renderObjectList() {
  const stage = currentStage();
  const found = currentFound(stage);
  const list = $("#object-list"); list.innerHTML = "";
  const mode = stage.playMode || "collect";
  const explore = mode === "explore";
  const social = mode === "social" || (mode === "story" && stageFriends(stage).length > 0);
  const activity = ["ride", "rhythm", "reveal", "memory", "letter", "credits"].includes(mode);
  $("#play-view").classList.toggle("free-roam", explore);
  $("#play-view").classList.toggle("social-play", social);
  $("#play-view").classList.toggle("activity-play", activity);
  $(".scene-counter").hidden = explore || social || activity;
  $("#take-nearby").hidden = explore || social || activity;
  $("#hint-button").hidden = explore || social || activity;
  $("#friend-dialog").hidden = true; $("#activity-panel").hidden = !activity;
  activeConversation = null; activeScript = null;
  if (activity) { renderActivity(stage); $("#scene-message").textContent = mode === "credits" ? "Terima kasih sudah memainkan Untuk Leha." : "Ikuti instruksi di panel untuk menyelesaikan bagian ini."; return; }
  const scriptOnly = mode === "story" && !social && stage.script?.length && !stage.objects.length;
  if (scriptOnly) {
    $(".scene-counter").hidden = true; $("#take-nearby").hidden = true; $("#hint-button").hidden = true;
    $("#found-count").textContent = "";
    const done = Boolean(state.completeByStage[stageKey(stage)]) || currentActivity(stage).done;
    $("#stage-next").hidden = !done; setNextLabel(stage);
    if (done) { $("#scene-message").textContent = "Bagian cerita selesai. Tekan Lanjut untuk meneruskan."; }
    else { activeScript = { lines: stage.script, index: 0 }; renderScriptLine(); $("#scene-message").textContent = "Dengarkan obrolan Leha dan Hikam di atas motor. Tekan Lanjut / Enter."; }
    return;
  }
  if (explore || social) {
    $("#found-count").textContent = "";
    const allTalked = social && currentInteractions(stage).length >= stageFriends(stage).length;
    $("#scene-message").textContent = social ? allTalked ? "Semua teman sudah disapa. Kamu bisa lanjut ke adegan berikutnya." : "Gerakkan Leha mendekati teman, lalu tekan Enter atau ketuk temannya untuk ngobrol." : "Jalankan Leha ke ujung kanan untuk melanjutkan.";
    $("#stage-next").hidden = social ? !allTalked : true; setNextLabel(stage); return;
  }
  $("#activity-panel").hidden = true;
  stage.objects.forEach((item) => { const done = found.includes(item.id); const row = document.createElement("li"); if (done) row.classList.add("done"); row.innerHTML = `<span class="object-icon">${done ? "✓" : item.icon}</span><span>${item.name}</span>`; list.append(row); });
  $("#found-count").textContent = `${found.length} / ${stage.objects.length}`;
  $$(".hotspot", $("#scene")).forEach((spot) => { spot.classList.toggle("found", found.includes(spot.dataset.item)); if (spot.dataset.item) spot.hidden = found.includes(spot.dataset.item); });
  const complete = found.length === stage.objects.length;
  $("#scene-message").textContent = complete ? "Semua benda ditemukan. Lanjutkan untuk membuka bagian berikutnya." : "Gerakkan Leha ke kiri/kanan, dekati benda, lalu tekan Enter atau AMBIL.";
  $("#stage-next").hidden = !complete; setNextLabel(stage); $("#hint-button").disabled = complete;
}

function renderGameStage() {
  clearTimeout(sceneTimer);
  clearTypingText();
  const stage = currentStage();
  $("#game-eyebrow").innerHTML = `<span class="eyebrow-line"></span> ${stage.eyebrow}`;
  $("#scene-title").textContent = activeChapter.id === "prologue" ? activeChapter.title : stage.location;
  $("#scene-location").textContent = stage.location;
  $(".scene-label-right").textContent = stage.playMode === "ride" ? "ANIMASI PERJALANAN" : stage.playMode === "rhythm" ? "KETUK: A/D" : stage.playMode === "credits" ? "ENDING CREDIT" : stage.playMode === "letter" ? "SURAT TERAKHIR" : ["social", "story"].includes(stage.playMode) && stageFriends(stage).length ? "GERAK: A/D · SAPA: ENTER" : "GERAK: A/D · INTERAKSI: ENTER";
  playerPosition = { x: stage.playMode === "explore" ? 0.075 : 0.5, y: 0.76 };
  activeScript = null;
  nearbyObjectId = null;
  $("#player").classList.remove("facing-left", "moving", "near-object");
  $("#player").style.left = `${playerPosition.x * 100}%`;
  $("#player").style.top = "76%";
  renderSceneVisual(stage);
  renderObjectList();
  updateNearbyObject();
  clearTimeout(sceneTimer);
}

function showNarration(phase) {
  narrationPhase = phase;
  const stage = currentStage();
  const intro = phase === "intro";
  const lastStage = stageIndex === games[activeChapter.id].stages.length - 1;
  $("#narration-view").hidden = false;
  $("#play-view").hidden = true;
  $("#narration-kicker").textContent = intro ? `${activeChapter.label} · SEBELUM BERMAIN` : `${activeChapter.label} · SETELAH BERMAIN`;
  $("#narration-heading").textContent = intro ? stage.location : lastStage ? `${activeChapter.label} selesai` : "Bagian berikutnya terbuka";
  $("#narration-text").textContent = intro ? stage.intro : stage.outro;
  const narrator = "Poniman";
  $("#narrator-name").textContent = "NARATOR / PONIMAN";
  $("#narrator-image").src = `assets/characters/${narrator.toLowerCase()}-idle.svg`;
  $("#narrator-image").alt = `Potret narator ${narrator}`;
  $("#narrator-badge").textContent = "PONIMAN · PEMANDU";
  $(".narrator-portrait").classList.add("star-narrator");
  $("#narration-continue").innerHTML = intro
    ? 'Mulai bermain <span aria-hidden="true">→</span>'
    : lastStage ? 'Kembali ke peta <span aria-hidden="true">→</span>' : 'Lanjut ke adegan berikutnya <span aria-hidden="true">→</span>';
}

function continueNarration() {
  if (narrationPhase === "intro") {
    $("#narration-view").hidden = true;
    $("#play-view").hidden = false;
    updateNearbyObject();
    const stage = currentStage();
    if (stage.playMode === "ride") {
      const ride = currentActivity(stage);
      if (!ride.done) sceneTimer = window.setTimeout(() => { ride.done = true; saveState(); renderActivity(stage); }, stage.activity.duration);
    }
    return;
  }
  const stages = games[activeChapter.id].stages;
  if (stageIndex < stages.length - 1) {
    stageIndex += 1;
    renderGameStage();
    showNarration("intro");
    return;
  }
  state.completeByChapter[activeChapter.id] = true;
  saveState();
  selectedChapter = activeChapter;
  renderChapters();
  renderChapterDetail();
  showScreen("map-screen");
  showToast(`${activeChapter.label} selesai`, true);
}

function openGame(chapter) {
  if (!isUnlocked(chapter)) return;
  activeChapter = chapter;
  stageIndex = 0;
  if (state.completeByChapter[chapter.id]) {
    const prefix = `${chapter.id}/`;
    Object.keys(state.foundByStage).filter((key) => key.startsWith(prefix)).forEach((key) => delete state.foundByStage[key]);
    Object.keys(state.completeByStage).filter((key) => key.startsWith(prefix)).forEach((key) => delete state.completeByStage[key]);
    Object.keys(state.interactionsByStage).filter((key) => key.startsWith(prefix)).forEach((key) => delete state.interactionsByStage[key]);
    Object.keys(state.activityByStage).filter((key) => key.startsWith(prefix)).forEach((key) => delete state.activityByStage[key]);
    delete state.completeByChapter[chapter.id];
    saveState();
  }
  const unfinished = games[chapter.id].stages.findIndex((stage) => !state.completeByStage[`${chapter.id}/${stage.id}`]);
  stageIndex = unfinished >= 0 ? unfinished : games[chapter.id].stages.length - 1;
  renderGameStage();
  showNarration("intro");
  showScreen("game-screen");
}

function isNearObject(id) {
  const player = $("#player").getBoundingClientRect();
  const target = $(`[data-item="${id}"]`, $("#scene"))?.getBoundingClientRect();
  if (!target || !target.width || !player.width) return false;
  const dx = player.left + player.width / 2 - (target.left + target.width / 2);
  return Math.abs(dx) <= Math.max(76, $("#scene").clientWidth * 0.055);
}

function updateNearbyObject() {
  const scene = $("#scene");
  if (!scene.clientWidth) return;
  if (["social", "story"].includes(currentStage().playMode) && stageFriends(currentStage()).length) {
    const friends = $$(".friend-npc:not(.talked)", scene).filter((node) => node.getBoundingClientRect().width > 0);
    const player = $("#player").getBoundingClientRect();
    const playerX = player.left + player.width / 2;
    const near = friends.sort((a, b) => {
      const ax = a.getBoundingClientRect().left + a.getBoundingClientRect().width / 2;
      const bx = b.getBoundingClientRect().left + b.getBoundingClientRect().width / 2;
      return Math.abs(playerX - ax) - Math.abs(playerX - bx);
    }).find((node) => {
      const box = node.getBoundingClientRect();
      return Math.abs(playerX - (box.left + box.width / 2)) <= Math.max(95, scene.clientWidth * 0.085);
    });
    $$(".friend-npc", scene).forEach((node) => node.classList.toggle("nearby", Boolean(near && node === near)));
    nearbyFriendId = near?.dataset.friend || null;
    if (!activeConversation) {
      $("#scene-message").textContent = near
        ? `Leha dekat ${near.querySelector("span").textContent}. Tekan Enter atau ketuk untuk mengobrol.`
        : "Gerakkan Leha mendekati teman, lalu tekan Enter atau ketuk temannya untuk ngobrol.";
    }
    return;
  }
  nearbyFriendId = null;
  const candidates = $$(".hotspot:not(.found)", scene).filter((item) => item.getBoundingClientRect().width > 0);
  const near = candidates.filter((item) => isNearObject(item.dataset.item)).sort((a, b) => {
    const px = $("#player").getBoundingClientRect();
    const center = { x: px.left + px.width / 2, y: px.top + px.height / 2 };
    const distance = (node) => {
      const box = node.getBoundingClientRect();
      return Math.hypot(center.x - (box.left + box.width / 2), center.y - (box.top + box.height / 2));
    };
    return distance(a) - distance(b);
  })[0];
  $$(".hotspot", scene).forEach((item) => item.classList.toggle("nearby", Boolean(near && item === near)));
  $("#player").classList.toggle("near-object", Boolean(near));
  nearbyObjectId = near?.dataset.item || null;
  if (near) {
    const item = currentStage().objects.find((object) => object.id === nearbyObjectId);
    $("#scene-message").textContent = `Leha dekat ${item.name}. Tekan Enter atau AMBIL.`;
  }
}

function movePlayer(direction) {
  if (activeConversation || activeScript) return;
  const stage = currentStage();
  if (stage.playMode === "ride") return;
  playSfx(stage.playMode === "rhythm" ? "drum" : "step");
  if (stage.playMode === "motor") {
    const a = stage.activity, progress = currentActivity(stage);
    if (progress.done || progress.redStopped) return;
    progress.lane = direction === "left" ? Math.max(0, progress.lane - 1) : Math.min(2, progress.lane + 1);
    playerPosition.x = [0.25, 0.5, 0.75][progress.lane];
    const obstacle = a.obstacles[progress.index];
    if (progress.lane === obstacle.blockedLane) { progress.lane = 1; playerPosition.x = 0.5; showToast(`Hindari ${obstacle.name}, coba jalur lain.`); }
    else progress.index++;
    if (progress.index === a.redAfter) progress.redStopped = true;
    if (progress.index >= a.obstacles.length) progress.done = true;
    $("#player").style.left = `${playerPosition.x * 100}%`; saveState(); renderActivity(stage); return;
  }
  if (stage.playMode === "rhythm") {
    const progress = currentActivity(stage), sequence = stage.activity.sequence;
    if (progress.done) return;
    if (sequence[progress.index] === direction) progress.index++;
    else { progress.index = 0; showToast("Ketukan meleset—mulai polanya lagi."); }
    progress.done = progress.index >= sequence.length; saveState(); renderActivity(stage); return;
  }
  const scene = $("#scene");
  if (!scene.clientWidth) return;
  const stepX = 30 / scene.clientWidth;
  if (direction === "left") playerPosition.x = Math.max(0.055, playerPosition.x - stepX);
  if (direction === "right") playerPosition.x = Math.min(0.945, playerPosition.x + stepX);
  $("#player").style.left = `${playerPosition.x * 100}%`;
  $("#player").style.top = "76%";
  $("#player").classList.toggle("facing-left", direction === "left");
  $("#player").classList.add("moving");
  clearTimeout(movementTimer);
  movementTimer = setTimeout(() => $("#player").classList.remove("moving"), 170);
  updateNearbyObject();
  if (currentStage().playMode === "explore") {
    const reachedEnd = playerPosition.x >= 0.88;
    const nextButton = $("#stage-next");
    nextButton.hidden = !reachedEnd;
    const lastStage = stageIndex === games[activeChapter.id].stages.length - 1;
    nextButton.textContent = lastStage ? `Selesaikan ${activeChapter.label} →` : "Lanjut ke masa SMA →";
    $("#scene-message").textContent = reachedEnd
      ? "Leha sudah sampai di ujung adegan. Tekan Lanjut untuk meneruskan cerita."
      : "Jalankan Leha ke kanan untuk menjelajahi adegan. Tidak ada collectible di sini.";
  } else if (["social", "story"].includes(currentStage().playMode) && stageFriends(currentStage()).length) {
    const stage = currentStage();
    const allTalked = currentInteractions(stage).length >= stageFriends(stage).length;
    $("#stage-next").hidden = !allTalked;
    $("#scene-message").textContent = allTalked
      ? "Semua teman sudah disapa. Kamu bisa lanjut ke adegan berikutnya."
      : nearbyFriendId ? `Leha dekat ${stageFriends(stage).find((friend) => friend.id === nearbyFriendId).name}. Tekan Enter atau ketuk untuk mengobrol.`
        : "Gerakkan Leha mendekati teman, lalu tekan Enter atau ketuk temannya untuk ngobrol.";
  }
}

function startConversation(friendId) {
  if (activeConversation) return;
  const stage = currentStage();
  const friend = stageFriends(stage).find((item) => item.id === friendId);
  if (!friend) return;
  if (currentInteractions(stage).includes(friendId)) return showToast(`Kamu sudah menyapa ${friend.name}.`);
  if (friend.requires && !currentInteractions(stage).includes(friend.requires)) return showToast(friend.requiresHint || "Selesaikan obrolan sebelumnya dulu.");
  const player = $("#player").getBoundingClientRect();
  const npc = $(`[data-friend="${friendId}"]`, $("#scene"))?.getBoundingClientRect();
  if (!npc || Math.abs((player.left + player.width / 2) - (npc.left + npc.width / 2)) > Math.max(95, $("#scene").clientWidth * 0.085)) {
    showToast(`Dekati ${friend.name} dulu untuk ngobrol.`);
    return;
  }
  activeConversation = { friend, index: 0 };
  renderConversationLine();
}

function renderConversationLine() {
  if (!activeConversation) return;
  const { friend, index } = activeConversation;
  const [speaker, text] = friend.dialogue[index];
  $("#friend-dialogue-name").textContent = speaker;
  $("#friend-dialogue-role").textContent = speaker === "Poniman" ? "PONIMAN · PEMANDU" : `DIALOG · ${friend.name.toUpperCase()}`;
  startTypingText($("#friend-dialogue-text"), text);
  $("#friend-dialogue-portrait").src = `assets/characters/${portraitFor(speaker)}-idle.svg`;
  $("#friend-dialogue-portrait").alt = `Potret ${speaker}`;
  $("#friend-dialogue-next").innerHTML = index === friend.dialogue.length - 1 ? 'Selesai <span aria-hidden="true">✓</span>' : 'Lanjut <span aria-hidden="true">→</span>';
  $("#friend-dialog").hidden = false;
}

function continueConversation() {
  if (!activeConversation) return;
  if (finishTypingText()) return;
  if (activeConversation.index < activeConversation.friend.dialogue.length - 1) {
    activeConversation.index += 1;
    renderConversationLine();
    return;
  }
  const friend = activeConversation.friend;
  const stage = currentStage();
  state.interactionsByStage[stageKey(stage)] = [...currentInteractions(stage), friend.id];
  saveState();
  $(`[data-friend="${friend.id}"]`, $("#scene"))?.classList.add("talked");
  activeConversation = null;
  $("#friend-dialog").hidden = true;
  updateNearbyObject();
  const allTalked = currentInteractions(stage).length >= stageFriends(stage).length;
  $("#stage-next").hidden = !allTalked;
  if (allTalked) {
    $("#scene-message").textContent = "Semua teman sudah disapa. Kamu bisa lanjut ke adegan berikutnya.";
    showToast("Semua teman sudah kamu sapa. Adegan berikutnya terbuka!", true);
  }
}

function takeNearbyObject() {
  if (currentStage().playMode && currentStage().playMode !== "collect") return;
  if (!nearbyObjectId) {
    showToast("Dekati salah satu benda dulu.");
    return;
  }
  findObject(nearbyObjectId, true);
}

function findObject(id, requireNear = true) {
  const stage = currentStage();
  const found = currentFound(stage);
  if (found.includes(id)) return;
  const item = stage.objects.find((object) => object.id === id);
  if (!item) return;
  if (requireNear && !isNearObject(id)) {
    $("#scene-message").textContent = `Gerakkan Leha mendekati ${item.name.toLowerCase()} terlebih dahulu.`;
    showToast("Dekati bendanya dengan tombol kiri/kanan atau A/D.");
    return;
  }
  state.foundByStage[stageKey(stage)] = [...found, id];
  saveState();
  renderObjectList();
  updateNearbyObject();
  showToast(`${item.name} ditemukan`, true);
}

function giveHint() {
  const stage = currentStage();
  if (stage.playMode && stage.playMode !== "collect") return;
  const found = currentFound(stage);
  const next = stage.objects.find((item) => !found.includes(item.id));
  if (!next) return showToast("Semua benda sudah ditemukan.", true);
  $("#scene-message").textContent = `Petunjuk: ${next.clue}`;
  $(`[data-item="${next.id}"]`)?.focus({ preventScroll: true });
}

function advanceStage() {
  const stage = currentStage();
  if (["ride", "motor", "rhythm", "reveal", "memory", "letter", "credits"].includes(stage.playMode) && !currentActivity(stage).done) return;
  if (stage.playMode === "story" && !stageFriends(stage).length && stage.script?.length && !stage.objects.length && !currentActivity(stage).done) return;
  if (stage.playMode === "explore") {
    if (playerPosition.x < 0.88) return;
  } else if (["social", "story"].includes(stage.playMode) && stageFriends(stage).length) {
    if (currentInteractions(stage).length < stageFriends(stage).length) return;
  } else if (currentFound(stage).length !== stage.objects.length) return;
  state.completeByStage[stageKey(stage)] = true;
  saveState();
  if (stage.id === "final-letter-delivery" && stageIndex < games[activeChapter.id].stages.length - 1) {
    stageIndex += 1; renderGameStage(); showNarration("intro"); return;
  }
  if (stage.playMode === "letter" && stageIndex < games[activeChapter.id].stages.length - 1) {
    stageIndex += 1; renderGameStage(); $("#narration-view").hidden = true; $("#play-view").hidden = false; return;
  }
  if (stage.playMode === "credits") {
    state.completeByChapter[activeChapter.id] = true; saveState(); selectedChapter = activeChapter;
    renderChapters(); renderChapterDetail(); showScreen("map-screen"); showToast(`${activeChapter.label} selesai`, true); return;
  }
  showNarration("outro");
}

$("#start-button").addEventListener("click", () => {
  showScreen("loading-screen");
  startLoadingSequence();
});

$("#loading-back").addEventListener("click", () => { if (loadingFrame) cancelAnimationFrame(loadingFrame); loadingFrame = 0; showScreen("home-screen"); });
$("#loading-continue").addEventListener("click", () => { if (!$("#loading-continue").disabled) showScreen("character-select-screen"); });
$("#select-back").addEventListener("click", () => showScreen("loading-screen"));
$("#choose-leha").addEventListener("click", () => {
  selectedCharacterId = "leha";
  $("#choose-leha").classList.add("selected");
  $("#choose-leha").setAttribute("aria-pressed", "true");
  $("#selected-character-note").textContent = "Karakter dipilih: Leha";
  $("#character-continue").textContent = "Lanjut sebagai Leha →";
});
$("#character-continue").addEventListener("click", () => {
  if (selectedCharacterId !== "leha") return;
  selectedChapter = chapters[0];
  renderChapters();
  renderChapterDetail();
  showScreen("map-screen");
});

$("#map-home-button").addEventListener("click", () => showScreen("home-screen"));
$("#character-gallery-button").addEventListener("click", () => showScreen("characters-screen"));
$("#characters-back-button").addEventListener("click", () => showScreen("map-screen"));
$("#back-to-map").addEventListener("click", () => {
  clearTimeout(sceneTimer);
  renderChapters();
  renderChapterDetail();
  showScreen("map-screen");
});
$("#game-map-button").addEventListener("click", () => {
  clearTimeout(sceneTimer);
  renderChapters();
  renderChapterDetail();
  showScreen("map-screen");
});
$("#hint-button").addEventListener("click", giveHint);
$("#stage-next").addEventListener("click", advanceStage);
$("#narration-continue").addEventListener("click", continueNarration);
$("#scene").addEventListener("click", (event) => {
  const friend = event.target.closest("[data-friend]");
  if (friend) {
    startConversation(friend.dataset.friend);
    return;
  }
  const hotspot = event.target.closest("[data-item]");
  if (hotspot) findObject(hotspot.dataset.item);
});
$$('[data-move]').forEach((button) => button.addEventListener("click", () => movePlayer(button.dataset.move)));
$("#take-nearby").addEventListener("click", takeNearbyObject);
$("#friend-dialogue-next").addEventListener("click", () => activeScript ? continueScript() : continueConversation());
document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled || button.hasAttribute("data-move")) return;
  playSfx("ui");
}, true);

$("#sound-toggle").addEventListener("click", () => { window.Music?.toggle(); });

document.addEventListener("keydown", (event) => {
  if (!$("#game-screen").hidden) {
    const key = event.key.toLowerCase();
    const directions = { arrowleft: "left", a: "left", arrowright: "right", d: "right" };
    if (directions[key]) {
      event.preventDefault();
      movePlayer(directions[key]);
    } else if ((event.key === "Enter" || event.key === " ") && !event.target.closest("button, input, textarea, select")) {
      playSfx("ui");
      if (!$("#narration-view").hidden) {
        event.preventDefault();
        continueNarration();
      } else if (activeScript) {
        event.preventDefault();
        continueScript();
      } else if (activeConversation) {
        event.preventDefault();
        continueConversation();
      } else if (["social", "story"].includes(currentStage().playMode) && stageFriends(currentStage()).length) {
        event.preventDefault();
        if (nearbyFriendId) startConversation(nearbyFriendId);
      } else {
        event.preventDefault();
        takeNearbyObject();
      }
    } else if (key === "h") giveHint();
  }
  if (event.key === "Escape" && !$("#game-screen").hidden) {
    renderChapters();
    renderChapterDetail();
    showScreen("map-screen");
  }
});

renderChapters();
renderChapterDetail();
renderCharacterGallery();
renderObjectList();
