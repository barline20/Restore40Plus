const programs = {
  fisik: [
    {
      title: "Mengenali Lelah Tubuh",
      activity: "Check-in tubuh",
      guide:
        "Luangkan sekitar lima menit untuk duduk dengan tenang. Arahkan perhatian Anda ke tubuh, dan perhatikan bagian mana yang terasa paling lelah. Tidak perlu mengubah atau memperbaiki apa pun—cukup sadari, dan izinkan tubuh didengar."
    },
    {
      title: "Melambat dengan Lembut",
      activity: "Gerakan ringan",
      guide:
        "Lakukan gerakan sederhana seperti peregangan ringan atau berjalan pelan selama kurang lebih sepuluh menit. Tidak perlu memaksakan diri atau mengejar hasil. Hadirlah sepenuhnya, dan biarkan tubuh bergerak dengan ritmenya sendiri."
    },
    {
      title: "Memberi Jeda",
      activity: "Istirahat sadar",
      guide:
        "Ambil satu jeda singkat hari ini, meski hanya beberapa menit. Berbaring atau duduklah dengan nyaman, tarik napas perlahan, dan izinkan tubuh benar-benar berhenti sejenak tanpa rasa bersalah."
    },
    {
      title: "Mendengarkan Tubuh",
      activity: "Respons tubuh",
      guide:
        "Ketika tubuh memberi sinyal lelah, cobalah untuk mendengarkannya. Mungkin itu berarti tidur lebih awal, menunda satu aktivitas, atau sekadar memperlambat langkah. Mengikuti tubuh juga adalah bentuk kepedulian."
    },
    {
      title: "Merawat dengan Syukur",
      activity: "Self-care kecil",
      guide:
        "Lakukan satu hal sederhana untuk merawat tubuh Anda hari ini. Tidak harus produktif atau sempurna. Cukup sesuatu yang memberi rasa nyaman dan menenangkan, sebagai ungkapan syukur pada diri sendiri."
    }
  ],

  pikiran: [
    {
      title: "Mengurangi Beban Kepala",
      activity: "Menulis bebas",
      guide:
        "Selama lima menit, tuliskan apa pun yang ada di kepala Anda. Tidak perlu rapi, tidak perlu masuk akal. Biarkan pikiran keluar dari kepala dan berpindah ke kertas, tanpa disaring atau dinilai."
    },
    {
      title: "Diam yang Aman",
      activity: "Duduk hening",
      guide:
        "Duduklah dengan tenang selama beberapa menit. Biarkan pikiran datang dan pergi tanpa harus diikuti. Anda tidak perlu mengusirnya—cukup menyadari bahwa Anda aman untuk diam."
    },
    {
      title: "Satu Fokus Kecil",
      activity: "Prioritas ringan",
      guide:
        "Hari ini, pilih satu hal kecil saja untuk menjadi fokus Anda. Tidak perlu menyelesaikan semuanya. Yang lain boleh menunggu, dan itu tidak apa-apa."
    },
    {
      title: "Melepas Tekanan",
      activity: "Tarik napas",
      guide:
        "Tarik napas perlahan selama empat hitungan, lalu hembuskan selama enam hitungan. Lakukan beberapa kali dengan lembut. Biarkan napas membantu pikiran sedikit melonggar."
    },
    {
      title: "Memberi Ruang",
      activity: "Membiarkan",
      guide:
        "Izinkan pikiran Anda hari ini tidak harus produktif atau teratur. Tidak apa-apa jika terasa kosong atau diam. Memberi ruang juga bagian dari pemulihan."
    }
  ],

  emosional: [
    {
      title: "Menyadari Perasaan",
      activity: "Check-in emosi",
      guide:
        "Tanyakan dengan lembut pada diri sendiri, ‘Apa yang sedang saya rasakan saat ini?’ Tidak perlu jawaban yang tepat atau rapi. Cukup sadari apa pun yang muncul."
    },
    {
      title: "Mengizinkan Emosi Ada",
      activity: "Diam bersama perasaan",
      guide:
        "Biarkan perasaan hadir apa adanya, tanpa dihakimi atau diperbaiki. Anda tidak perlu melakukan apa pun. Kehadiran saja sudah cukup."
    },
    {
      title: "Menulis Perasaan",
      activity: "Ekspresi emosi",
      guide:
        "Tuliskan perasaan Anda hari ini dengan jujur. Tidak masalah jika terasa berantakan atau tidak runtut. Tulisan ini hanya untuk Anda."
    },
    {
      title: "Belas Kasih pada Diri",
      activity: "Self-kindness",
      guide:
        "Ucapkan satu kalimat yang lembut pada diri sendiri, seolah Anda sedang berbicara pada seorang sahabat. Biarkan kata-kata itu menenangkan, bukan menuntut."
    },
    {
      title: "Menguatkan Diri",
      activity: "Apresiasi kecil",
      guide:
        "Akui satu hal kecil yang berhasil Anda lewati hari ini. Tidak harus besar atau istimewa. Bertahan pun sudah layak dihargai."
    }
  ],

  sensorik: [
    {
      title: "Memberi Jeda Indra",
      activity: "Puasa layar",
      guide:
        "Cobalah menjauh dari layar selama sekitar tiga puluh menit. Mungkin terasa canggung di awal, dan itu wajar. Izinkan indra Anda beristirahat dari rangsangan yang terus-menerus."
    },
    {
      title: "Keheningan",
      activity: "Sunyi sejenak",
      guide:
        "Temukan tempat yang relatif tenang, lalu dengarkan suara di sekitar Anda. Tidak perlu menganalisis atau menilai. Biarkan keheningan menemani Anda sejenak."
    },
    {
      title: "Cahaya Lembut",
      activity: "Menata ruang",
      guide:
        "Perhatikan pencahayaan di sekitar Anda. Redupkan lampu atau cari cahaya yang lebih lembut. Perubahan kecil ini bisa memberi rasa nyaman pada tubuh dan mata."
    },
    {
      title: "Suara Menenangkan",
      activity: "Audio lembut",
      guide:
        "Dengarkan musik atau suara alam yang menenangkan. Usahakan tidak melakukan hal lain bersamaan. Biarkan suara tersebut menjadi satu-satunya fokus Anda."
    },
    {
      title: "Ruang Aman",
      activity: "Sudut nyaman",
      guide:
        "Ciptakan satu sudut kecil yang terasa aman dan menenangkan. Tidak perlu sempurna. Cukup tempat di mana Anda bisa bernapas lebih lega."
    }
  ],

  relasi: [
    {
      title: "Mengakui Lelah Relasi",
      activity: "Refleksi relasi",
      guide:
        "Luangkan waktu untuk menyadari relasi mana yang terasa menguras energi. Tidak perlu menyalahkan siapa pun. Mengenali saja sudah merupakan langkah penting."
    },
    {
      title: "Berbagi Aman",
      activity: "Percakapan jujur",
      guide:
        "Jika memungkinkan, ceritakan perasaan Anda pada seseorang yang Anda percaya. Tidak perlu solusi atau nasihat. Didengarkan saja sudah cukup."
    },
    {
      title: "Mengambil Jeda",
      activity: "Menarik jarak",
      guide:
        "Hari ini, tidak apa-apa jika Anda tidak selalu tersedia untuk semua orang. Mengambil jarak sejenak bukan berarti menjauh, melainkan merawat diri."
    },
    {
      title: "Hadir Tanpa Peran",
      activity: "Kebersamaan sederhana",
      guide:
        "Habiskan waktu bersama seseorang tanpa harus menjalankan peran apa pun. Tidak perlu menjadi kuat, bijak, atau berguna. Hadir saja sudah cukup."
    },
    {
      title: "Merasa Ditemani",
      activity: "Mengingat kehangatan",
      guide:
        "Ingat kembali satu relasi yang membuat Anda merasa diterima apa adanya. Biarkan ingatan itu memberi rasa hangat dan aman."
    }
  ],

  ekspresif: [
    {
      title: "Ekspresi Bebas",
      activity: "Menulis / menggambar",
      guide:
        "Ekspresikan apa pun yang ada di dalam diri Anda melalui tulisan atau gambar. Tidak perlu tujuan atau hasil yang bagus. Prosesnya jauh lebih penting."
    },
    {
      title: "Suara & Musik",
      activity: "Mendengar lagu",
      guide:
        "Pilih satu lagu yang Anda sukai, lalu dengarkan dengan penuh perhatian. Rasakan nada, lirik, dan suasana yang muncul, tanpa tergesa-gesa."
    },
    {
      title: "Aktivitas Tangan",
      activity: "Proses sederhana",
      guide:
        "Lakukan aktivitas sederhana yang melibatkan tangan, seperti memasak atau merapikan sesuatu. Biarkan gerakan kecil ini membantu Anda kembali hadir."
    },
    {
      title: "Menikmati Keindahan",
      activity: "Mengamati",
      guide:
        "Perhatikan satu hal kecil yang terasa indah hari ini. Tidak perlu dianalisis atau dijelaskan. Cukup dilihat dan dirasakan."
    },
    {
      title: "Merayakan Hidup",
      activity: "Hal yang disukai",
      guide:
        "Lakukan satu hal yang benar-benar Anda nikmati hari ini. Izinkan diri Anda menikmatinya tanpa rasa bersalah atau tuntutan."
    }
  ],

  spiritual: [
    {
      title: "Hadir dengan Diri",
      activity: "Refleksi hening",
      guide:
        "Duduklah dengan tenang dan sadari keberadaan Anda saat ini. Tidak perlu mencapai apa pun. Cukup hadir, bernapas, dan menyadari diri."
    },
    {
      title: "Keheningan",
      activity: "Diam sadar",
      guide:
        "Bernapaslah perlahan sambil membiarkan keheningan menemani Anda. Tidak perlu mengisi ruang ini dengan kata atau pikiran."
    },
    {
      title: "Doa / Refleksi",
      activity: "Ungkapan hati",
      guide:
        "Sampaikan isi hati Anda dengan jujur, apa adanya. Tidak perlu kata-kata indah. Ketulusan jauh lebih penting."
    },
    {
      title: "Menata Arah",
      activity: "Makna kecil",
      guide:
        "Pikirkan satu hal kecil yang terasa bermakna bagi Anda hari ini. Tidak harus besar atau mengubah hidup. Cukup sesuatu yang memberi arah."
    },
    {
      title: "Syukur Sederhana",
      activity: "Menyebutkan syukur",
      guide:
        "Sebutkan tiga hal kecil yang patut Anda syukuri hari ini. Biarkan rasa syukur hadir dengan lembut, tanpa paksaan."
    }
  ]
};
