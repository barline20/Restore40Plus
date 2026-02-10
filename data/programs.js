const programs = {
  fisik: [
    {
      title: "Mengenali Lelah Tubuh",
      activity: "Check-in tubuh",
      guide:
        "Luangkan 5 menit untuk duduk tenang. Perhatikan bagian tubuh mana yang terasa paling lelah, tanpa perlu mengubah apa pun."
    },
    {
      title: "Melambat dengan Lembut",
      activity: "Gerakan ringan",
      guide:
        "Lakukan peregangan sederhana atau berjalan pelan selama 10 menit. Tidak perlu kuat, cukup hadir."
    },
    {
      title: "Memberi Jeda",
      activity: "Istirahat sadar",
      guide:
        "Ambil satu jeda singkat hari ini. Rebahan, tarik napas perlahan, dan izinkan tubuh berhenti sejenak."
    },
    {
      title: "Mendengarkan Tubuh",
      activity: "Respons tubuh",
      guide:
        "Saat tubuh memberi sinyal lelah, coba ikuti. Mungkin tidur lebih awal atau menunda satu aktivitas."
    },
    {
      title: "Merawat dengan Syukur",
      activity: "Self-care kecil",
      guide:
        "Lakukan satu hal sederhana untuk tubuh Anda hari ini. Tidak harus produktif, cukup menenangkan."
    }
  ],

  pikiran: [
    {
      title: "Mengurangi Beban Kepala",
      activity: "Menulis bebas",
      guide:
        "Tuliskan semua yang ada di kepala Anda selama 5 menit. Tidak perlu rapi atau masuk akal."
    },
    {
      title: "Diam yang Aman",
      activity: "Duduk hening",
      guide:
        "Duduk diam selama beberapa menit. Biarkan pikiran lewat tanpa harus diikuti."
    },
    {
      title: "Satu Fokus Kecil",
      activity: "Prioritas ringan",
      guide:
        "Hari ini, cukup pilih satu hal kecil untuk diselesaikan. Yang lain boleh menunggu."
    },
    {
      title: "Melepas Tekanan",
      activity: "Tarik napas",
      guide:
        "Tarik napas dalam 4 hitungan, hembuskan 6 hitungan. Ulangi beberapa kali."
    },
    {
      title: "Memberi Ruang",
      activity: "Membiarkan",
      guide:
        "Izinkan pikiran Anda tidak harus produktif hari ini. Diam juga boleh."
    }
  ],

  emosional: [
    {
      title: "Menyadari Perasaan",
      activity: "Check-in emosi",
      guide:
        "Tanyakan pada diri sendiri: ‘Apa yang sedang saya rasakan?’ Tidak perlu dijawab dengan benar."
    },
    {
      title: "Mengizinkan Emosi Ada",
      activity: "Diam bersama perasaan",
      guide:
        "Biarkan perasaan hadir tanpa dihakimi. Tidak perlu diperbaiki."
    },
    {
      title: "Menulis Perasaan",
      activity: "Ekspresi emosi",
      guide:
        "Tuliskan perasaan Anda hari ini, meskipun terasa berantakan."
    },
    {
      title: "Belas Kasih pada Diri",
      activity: "Self-kindness",
      guide:
        "Ucapkan satu kalimat lembut pada diri sendiri, seperti pada sahabat."
    },
    {
      title: "Menguatkan Diri",
      activity: "Apresiasi kecil",
      guide:
        "Akui satu hal kecil yang sudah Anda lewati hari ini."
    }
  ],

  sensorik: [
    {
      title: "Memberi Jeda Indra",
      activity: "Puasa layar",
      guide:
        "Jauhkan diri dari layar selama 30 menit. Tidak apa-apa jika terasa canggung."
    },
    {
      title: "Keheningan",
      activity: "Sunyi sejenak",
      guide:
        "Cari tempat tenang dan dengarkan suara sekitar tanpa distraksi."
    },
    {
      title: "Cahaya Lembut",
      activity: "Menata ruang",
      guide:
        "Redupkan cahaya atau cari pencahayaan yang lebih nyaman."
    },
    {
      title: "Suara Menenangkan",
      activity: "Audio lembut",
      guide:
        "Dengarkan musik atau suara alam tanpa melakukan hal lain."
    },
    {
      title: "Ruang Aman",
      activity: "Sudut nyaman",
      guide:
        "Ciptakan satu sudut kecil yang terasa aman dan tenang."
    }
  ],

  relasi: [
    {
      title: "Mengakui Lelah Relasi",
      activity: "Refleksi relasi",
      guide:
        "Sadari relasi mana yang terasa menguras, tanpa menyalahkan siapa pun."
    },
    {
      title: "Berbagi Aman",
      activity: "Percakapan jujur",
      guide:
        "Jika memungkinkan, ceritakan perasaan Anda pada orang yang dipercaya."
    },
    {
      title: "Mengambil Jeda",
      activity: "Menarik jarak",
      guide:
        "Hari ini, tidak apa-apa untuk tidak selalu tersedia bagi semua orang."
    },
    {
      title: "Hadir Tanpa Peran",
      activity: "Kebersamaan sederhana",
      guide:
        "Habiskan waktu bersama seseorang tanpa harus menjadi ‘apa-apa’."
    },
    {
      title: "Merasa Ditemani",
      activity: "Mengingat kehangatan",
      guide:
        "Ingat satu relasi yang membuat Anda merasa diterima apa adanya."
    }
  ],

  ekspresif: [
    {
      title: "Ekspresi Bebas",
      activity: "Menulis / menggambar",
      guide:
        "Ekspresikan diri tanpa tujuan. Tidak harus bagus."
    },
    {
      title: "Suara & Musik",
      activity: "Mendengar lagu",
      guide:
        "Dengarkan satu lagu yang Anda suka, dengan penuh perhatian."
    },
    {
      title: "Aktivitas Tangan",
      activity: "Proses sederhana",
      guide:
        "Lakukan aktivitas manual seperti memasak atau merapikan sesuatu."
    },
    {
      title: "Menikmati Keindahan",
      activity: "Mengamati",
      guide:
        "Perhatikan hal kecil yang indah hari ini, tanpa menganalisis."
    },
    {
      title: "Merayakan Hidup",
      activity: "Hal yang disukai",
      guide:
        "Lakukan satu hal yang Anda nikmati, tanpa rasa bersalah."
    }
  ],

  spiritual: [
    {
      title: "Hadir dengan Diri",
      activity: "Refleksi hening",
      guide:
        "Duduk diam dan sadari keberadaan Anda saat ini."
    },
    {
      title: "Keheningan",
      activity: "Diam sadar",
      guide:
        "Bernapas perlahan sambil membiarkan keheningan menemani."
    },
    {
      title: "Doa / Refleksi",
      activity: "Ungkapan hati",
      guide:
        "Sampaikan isi hati Anda dengan jujur, apa adanya."
    },
    {
      title: "Menata Arah",
      activity: "Makna kecil",
      guide:
        "Pikirkan satu hal yang terasa bermakna bagi Anda hari ini."
    },
    {
      title: "Syukur Sederhana",
      activity: "Menyebutkan syukur",
      guide:
        "Sebutkan tiga hal kecil yang patut disyukuri."
    }
  ]
};
