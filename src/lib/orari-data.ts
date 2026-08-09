/* ============================================================
   DATA KONTEN ORARI LOKAL MAJENE
   ------------------------------------------------------------
   Semua konten teks website dipisahkan dari tampilan (view)
   agar mudah dikelola dan mudah dikembangkan menjadi CMS
   WordPress di masa mendatang. Cukup ubah data di file ini
   tanpa menyentuh kode tampilan.
   ============================================================ */

/* ====== IDENTITAS ORGANISASI ====== */
export const ORG_INFO = {
  name: "ORARI Lokal Majene",
  fullName: "Organisasi Amatir Radio Indonesia",
  tagline: "Lokal Majene",
  region: "Kabupaten Majene",
  province: "Provinsi Sulawesi Barat",
  description:
    "ORARI Lokal Majene merupakan organisasi amatir radio yang menghimpun para amatir radio di Kabupaten Majene sebagai wadah pembinaan, pengembangan ilmu pengetahuan dan teknologi komunikasi radio, dukungan komunikasi kebencanaan, kegiatan sosial kemasyarakatan, serta mendukung komunikasi pada kegiatan pemerintah sesuai ketentuan yang berlaku.",
  /* Informasi Teknis Radio */
  callsign: "YH8FB",
  baseStation: "145.250 MHz",
  repeater: "146.620 MHz",
  offset: "-600 kHz",
  wilayah: "Kabupaten Majene",
  /* Kontak */
  address: {
    line1: "Jl. AP. Pettarani No. 11",
    line2: "Labuang Utara",
    line3: "Kecamatan Banggae Timur",
    line4: "Kabupaten Majene",
    line5: "Sulawesi Barat",
  },
  email: "orarilokalmajene@gmail.com",
  whatsapp: [
    { label: "085 327 777 880", value: "6285327777880" },
    { label: "082 336 827 568", value: "6282336827568" },
  ],
  social: [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "WhatsApp", href: "#" },
  ],
};

/* ====== MENU NAVIGASI ====== */
export const NAV_MENU = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Berita", href: "#berita" },
  { label: "Layanan", href: "#layanan" },
  { label: "CORE", href: "#core" },
  { label: "Dokumen", href: "#dokumen" },
  { label: "Kontak", href: "#kontak" },
];

/* ====== PROFIL ORGANISASI ====== */
export const PROFIL = {
  tentang:
    "ORARI Lokal Majene adalah pengurus lokal Organisasi Amatir Radio Indonesia yang berkedudukan di Kabupaten Majene, Provinsi Sulawesi Barat. Organisasi ini menjadi wadah resmi bagi para amatir radio di wilayah Majene untuk berolah ilmu, berkreasi, dan berkontribusi bagi masyarakat melalui komunikasi radio.",
  sejarah:
    "ORARI (Organisasi Amatir Radio Indonesia) didirikan secara nasional pada tanggal 9 Juli 1968 di Jakarta sebagai satu-satinya wadah organisasi amatir radio yang diakui pemerintah Republik Indonesia. Seiring perkembangannya, ORARI membentuk pengurus di berbagai daerah, termasuk ORARI Lokal Majene yang melayani wilayah Kabupaten Majene, Sulawesi Barat, sebagai bagian dari ORARI Daerah Sulawesi Barat.",
  visi: "Menjadi organisasi amatir radio yang profesional, mandiri, dan terdepan dalam pengembangan ilmu pengetahuan, teknologi komunikasi radio, serta dukungan komunikasi kebencanaan di Kabupaten Majene.",
  misi: [
    "Membina dan mengembangkan kemampuan anggota di bidang komunikasi radio amatir.",
    "Menyelenggarakan pendidikan dan ujian amatir radio secara berkala.",
    "Mendukung komunikasi pada situasi darurat dan kebencanaan.",
    "Menumbuhkan kekeluargaan dan persahabatan antar amatir radio.",
    "Mendorong tertib penggunaan spektrum frekuensi radio sesuai regulasi.",
  ],
  tujuan: [
    "Menghimpun para amatir radio di Kabupaten Majene dalam satu wadah organisasi.",
    "Meningkatkan keterampilan dan pengetahuan anggota di bidang komunikasi radio.",
    "Memberikan dukungan komunikasi kepada pemerintah dan masyarakat.",
    "Mengembangkan persahabatan nasional maupun internasional.",
  ],
  nilai: [
    {
      title: "Profesional",
      desc: "Bekerja dengan kompetensi dan tanggung jawab.",
    },
    { title: "Kekeluargaan", desc: "Mempererat persaudaraan antar anggota." },
    { title: "Pengabdian", desc: "Mengabdi bagi masyarakat dan bangsa." },
    {
      title: "Tertib Frekuensi",
      desc: "Menggunakan spektrum radio secara tertib.",
    },
  ],
};

/* ====== FUNGSI ORARI ====== */
export const FUNGSI_ORARI = [
  {
    icon: "Users",
    title: "Wadah Pembinaan",
    desc: "Wadah pembinaan dan pengembangan amatir radio di tingkat lokal.",
  },
  {
    icon: "Radio",
    title: "Pengembangan Kemampuan",
    desc: "Mengembangkan kemampuan anggota dalam komunikasi radio.",
  },
  {
    icon: "Siren",
    title: "Komunikasi Darurat",
    desc: "Mendukung komunikasi dalam keadaan darurat dan bencana.",
  },
  {
    icon: "HeartHandshake",
    title: "Kegiatan Sosial",
    desc: "Mendukung kegiatan sosial kemasyarakatan.",
  },
  {
    icon: "Building2",
    title: "Dukungan Pemerintah",
    desc: "Mendukung komunikasi pada kegiatan pemerintah sesuai ketentuan.",
  },
  {
    icon: "Globe",
    title: "Persahabatan",
    desc: "Menumbuhkan persahabatan antar amatir radio nasional dan internasional.",
  },
  {
    icon: "Signal",
    title: "Tertib Spektrum",
    desc: "Mendorong penggunaan spektrum frekuensi radio secara tertib sesuai regulasi.",
  },
];

/* ====== LAYANAN ====== */
export const LAYANAN = [
  {
    icon: "ClipboardCheck",
    title: "UNAR",
    desc: "Uji Negara Amatir Radio — persyaratan untuk memperoleh izin amatir radio.",
  },
  {
    icon: "Award",
    title: "IAR",
    desc: "Izin Amatir Radio — pengakuan resmi sebagai amatir radio yang sah.",
  },
  {
    icon: "IdCard",
    title: "KTA ORARI",
    desc: "Kartu Tanda Anggota ORARI sebagai identitas keanggotaan resmi.",
  },
  {
    icon: "MonitorSmartphone",
    title: "SIORDIG",
    desc: "Sistem Orari Digital — . Sistem ini dipakai untuk mengelola administrasi keanggotaan secara elektronik.",
  },
  {
    icon: "Landmark",
    title: "ORARI Pusat",
    desc: "Tautan resmi menuju portal ORARI Pusat untuk informasi nasional.",
  },
  {
    icon: "Download",
    title: "Download Formulir",
    desc: "Unduh berbagai formulir resmi keanggotaan dan administrasi ORARI.",
  },
  {
    icon: "Scale",
    title: "Peraturan & Pedoman",
    desc: "Peraturan dan pedoman organisasi serta regulasi telekomunikasi.",
  },
  {
    icon: "RadioTower",
    title: "Informasi Frekuensi",
    desc: "Informasi alokasi dan penggunaan frekuensi amatir radio.",
  },
];

/* ====== CORE (Communication In Rescue & Emergency) ====== */
export const CORE_DATA = {
  title: "CORE",
  subtitle: "Communication In Rescue & Emergency",
  pengertian:
    "CORE (Communication In Rescue & Emergency) adalah satuan tugas ORARI yang khusus menangani komunikasi pada situasi penyelamatan (rescue) dan keadaan darurat (emergency). CORE menjadi tulang punggung komunikasi ketika jaringan komunikasi reguler tidak dapat berfungsi.",
  tujuan:
    "Menyediakan jaringan komunikasi radio yang andal dan cepat saat terjadi bencana, keadaan darurat, maupun operasi pencarian dan penyelamatan (SAR).",
  fungsi: [
    "Menjalankan komunikasi darurat saat bencana alam.",
    "Mendukung koordinasi tim penyelamatan (SAR).",
    "Menjaga komunikasi ketika infrastruktur telekomunikasi lumpuh.",
    "Melaporkan kondisi lapangan secara real-time kepada posko.",
  ],
  ruangLingkup: [
    "Bencana alam (banjir, tanah longsor, gempa).",
    "Operasi pencarian dan penyelamatan (SAR).",
    "Kegiatan pemerintah yang membutuhkan dukungan komunikasi.",
    "Kegiatan sosial dan kemasyarakatan skala besar.",
  ],
  peralatan: [
    "Radio HT (Handy Talky)",
    "Radio Mobile / Base Station",
    "Repeater portabel",
    "Antena lapangan",
    "Sumber daya cadangan (baterai/solar panel)",
  ],
  kegiatan: [
    "Latihan komunikasi darurat berkala.",
    "Aktivasi posko saat bencana.",
    "Dukungan komunikasi event pemerintah.",
    "Sosialisasi kesiapsiagaan bencana.",
  ],
  mitraKerja: [
    "BPBD Kabupaten Majene",
    "Tagana Sulawesi Barat",
    "Basarnas",
    "Polri & TNI",
    "Pemerintah Daerah",
    "PMI",
  ],
};

/* ====== BERITA ====== */
export const BERITA = [
  {
    title:
      "ORARI Lokal Majene Gelar Apel Siaga dan Perkemahan dalam Memperingati HUT ke-58 ORARI",
    date: "11–12 Juli 2026",
    excerpt:
      "Dalam rangka memperingati HUT ORARI ke-58, ORARI Lokal Majene melaksanakan apel siaga bersama RAPI, Pramuka, dan Desa/Kelurahan Tangguh Bencana (DESTANA). Kegiatan dilanjutkan dengan perkemahan satu malam, sosialisasi pra-JOTA kepada Pramuka, serta sosialisasi CORE kepada DESTANA Kelurahan Baru dan Kelurahan Rangas di Desyta Barane Beach, Kelurahan Baurung.",
    image: "/images/hut-orari.jpeg",
  },
];

/* ====== DOKUMEN ====== */
export const DOKUMEN = [
  {
    icon: "FileText",
    title: "AD/ART ORARI",
    desc: "Anggaran Dasar dan Rumah Tangga ORARI.",
  },
  {
    icon: "Handshake",
    title: "MoU",
    desc: "Nota Kesepahaman dengan mitra kerja.",
  },
  {
    icon: "FileSignature",
    title: "PKS",
    desc: "Perjanjian Kerja Sama kelembagaan.",
  },
  {
    icon: "Scale",
    title: "Peraturan Organisasi",
    desc: "Peraturan dan ketetapan organisasi.",
  },
  {
    icon: "Mail",
    title: "Surat Edaran",
    desc: "Surat edaran pengurus kepada anggota.",
  },
  {
    icon: "FileCheck",
    title: "Formulir",
    desc: "Formulir administrasi keanggotaan.",
  },
  {
    icon: "BookOpen",
    title: "Panduan",
    desc: "Panduan operasional dan teknis radio.",
  },
  {
    icon: "FolderArchive",
    title: "Dokumen Lainnya",
    desc: "Dokumen pendukung organisasi.",
  },
];

/* ====== STATISTIK (untuk counter animation) ====== */
export const STATISTIK = [
  { label: "Jumlah Anggota", value: 86, suffix: "+" },
  { label: "Jumlah Kegiatan", value: 42, suffix: "" },
  { label: "Jumlah Mitra", value: 12, suffix: "" },
  { label: "Jumlah Operator", value: 54, suffix: "+" },
];

/* ====== GALERI ====== */
export const GALERI = [
  { src: "/images/gallery-1.jpg", alt: "Menara Antena Radio" },
  { src: "/images/gallery-2.jpg", alt: "Perangkat Radio Transceiver" },
  { src: "/images/gallery-3.jpg", alt: "Operator Radio HT" },
  { src: "/images/gallery-4.jpg", alt: "Stasiun Radio Lapangan" },
  { src: "/images/gallery-5.jpg", alt: "Rapat Anggota ORARI" },
  { src: "/images/gallery-6.jpg", alt: "Stasiun Repeater" },
];
