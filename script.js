/* ======================================================
   GLOBAL STATE + AUTOSAVE
====================================================== */
const state = JSON.parse(localStorage.getItem("restore40_state")) || {
  screen: 1,
  name: "",
  age: "",
  role: "",
  phone: "",
  answers: {},
  dominant: "",
  currentDay: 1
};

function saveState() {
  localStorage.setItem("restore40_state", JSON.stringify(state));
}

/* ======================================================
   NAVIGASI SCREEN
====================================================== */
window.goTo = function (target) {
  state.screen = target;
  saveState();

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const next = document.getElementById(`screen-${target}`);
  if (next) next.classList.add("active");

  window.scrollTo(0, 0);
};

/* ======================================================
   KONVERSI SKOR
====================================================== */
const SCORE_MAP = {
  "Ya": 3,
  "Terkadang": 2,
  "Tidak": 1
};

/* ======================================================
   INIT
====================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- RESTORE SCREEN ---------- */
  goTo(state.screen || 1);

  /* ================= SCREEN 2 : PROFIL ================= */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  if (nameInput) nameInput.value = state.name;
  if (ageInput) ageInput.value = state.age;

  function checkProfile() {
    btnNextProfile.disabled = !(nameInput.value.trim() && ageInput.value.trim());
  }

  nameInput?.addEventListener("input", () => {
    state.name = nameInput.value;
    saveState();
    checkProfile();
  });

  ageInput?.addEventListener("input", () => {
    state.age = ageInput.value;
    saveState();
    checkProfile();
  });

  btnNextProfile?.addEventListener("click", () => goTo(3));
  checkProfile();

  /* ================= SCREEN 3 : PERAN ================= */
  const roleOptions = document.querySelectorAll("#screen-3 .option");
  const customRole = document.getElementById("customRole");
  const btnStart = document.getElementById("btnStart");

  if (customRole) customRole.style.display = "none";
  if (btnStart) btnStart.disabled = true;

  roleOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      roleOptions.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");

      const val = opt.textContent.trim();
      if (val === "Lainnya") {
        customRole.style.display = "block";
        btnStart.disabled = true;
      } else {
        customRole.style.display = "none";
        state.role = val;
        saveState();
        btnStart.disabled = false;
      }
    });
  });

  customRole?.addEventListener("input", () => {
    state.role = customRole.value;
    btnStart.disabled = !customRole.value.trim();
    saveState();
  });

  btnStart?.addEventListener("click", () => goTo(4));

  /* ================= SCREEN 4 : PERTANYAAN ================= */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");

  function checkAnswered() {
    btnResult.disabled = Object.keys(state.answers).length !== questions.length;
  }

  if (questionBox) {
    questionBox.innerHTML = "";
    questions.forEach(q => {
      const card = document.createElement("div");
      card.className = "question-card";

      const p = document.createElement("p");
      p.textContent = q.text;

      const opts = document.createElement("div");

      ["Ya", "Terkadang", "Tidak"].forEach(label => {
        const o = document.createElement("div");
        o.className = "answer";
        o.textContent = label;

        if (state.answers[q.id] === label) o.classList.add("selected");

        o.addEventListener("click", () => {
          opts.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
          o.classList.add("selected");
          state.answers[q.id] = label;
          saveState();
          checkAnswered();
        });

        opts.appendChild(o);
      });

      card.appendChild(p);
      card.appendChild(opts);
      questionBox.appendChild(card);
    });
  }

  checkAnswered();

  btnResult?.addEventListener("click", () => {
    calculateResult();
    renderReflection();
    goTo(5);
  });

  /* ================= SCREEN 6 : SUBMIT HP ================= */
  const phoneInput = document.getElementById("phone");
  const btnSubmitPhone = document.querySelector("#screen-6 button.primary");

  if (phoneInput) phoneInput.value = state.phone;

  btnSubmitPhone?.addEventListener("click", () => {
    if (!phoneInput.value.trim()) {
      alert("Silakan masukkan nomor HP Anda 🤍");
      return;
    }
    state.phone = phoneInput.value;
    saveState();
    goTo(7);
    renderProgramDays();
  });

});

/* ======================================================
   HITUNG HASIL
====================================================== */
function calculateResult() {
  const scores = {};
  questions.forEach(q => {
    const val = SCORE_MAP[state.answers[q.id]] || 0;
    scores[q.dimension] = (scores[q.dimension] || 0) + val;
  });

  let max = -1;
  for (const d in scores) {
    if (scores[d] > max) {
      max = scores[d];
      state.dominant = d;
    }
  }
  saveState();
}

/* ======================================================
   REFLEKSI (LENGKAP)
====================================================== */
function renderReflection() {
  const box = document.getElementById("reflection");

  const titles = {
    fisik: "Kelelahan Fisik",
    pikiran: "Kelelahan Pikiran",
    emosional: "Kelelahan Emosional",
    sensorik: "Kelelahan Sensorik",
    relasi: "Kelelahan Relasi",
    ekspresif: "Kelelahan Ekspresif",
    spiritual: "Kelelahan Spiritual"
  };

  const reflections = {
    fisik: `
      🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.
      Mungkin bukan karena aktivitas berat, tapi karena terus berjalan tanpa benar-benar berhenti.
      <br><br><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Pelankan ritme dan beri tubuh ruang untuk bernapas.
    `,
    pikiran: `
      🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.
      Bahkan saat diam, kepala masih penuh oleh banyak hal.
      <br><br><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Tidak semua hal harus dipikirkan hari ini.
    `,
    emosional: `
      💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.
      Hati juga bisa capek.
      <br><br><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Akui dulu apa yang sedang dirasakan.
    `,
    sensorik: `
      🌱 Indra Anda mungkin sudah terlalu lama sibuk.
      <br><br><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Beri mata dan telinga jeda sejenak.
    `,
    relasi: `
      🤍 Anda banyak hadir untuk orang lain.
      <br><br><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Hadir juga untuk diri sendiri.
    `,
    ekspresif: `
      ✨ Bagian diri Anda yang menikmati hal-hal sederhana masih ada.
      <br><br><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Lakukan satu hal kecil yang Anda suka.
    `,
    spiritual: `
      🕯️ Ada keinginan untuk berhenti sejenak dan menata arah.
      <br><br><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Luangkan waktu hening sejenak.
    `
  };

  box.innerHTML = `
    <p>
      Setiap jawaban yang Anda berikan adalah cerita kecil tentang kondisi Anda saat ini.
      Dari sana, terlihat satu area yang sedang paling membutuhkan ruang untuk dipedulikan:
      <strong>${titles[state.dominant]}</strong>.
    </p>
    <p>${reflections[state.dominant]}</p>
  `;
}

/* ======================================================
   PROGRAM 5 HARI (DAY 1 OPEN, LOCKED BERTAHAP)
====================================================== */
const programs = {
  pikiran: [
    {
      title: "Mengosongkan Kepala",
      activity: "Menulis bebas",
      guide: `
Luangkan sekitar 10 menit untuk menulis apa pun yang ingin keluar dari kepala Anda.
Tidak perlu rapi, tidak perlu masuk akal, dan tidak perlu disimpan.
Jika di tengah jalan Anda ingin berhenti, itu juga tidak apa-apa.
Hari ini, menulis hanyalah cara untuk memberi ruang bernapas bagi pikiran.
      `
    },
    {
      title: "Diam yang Aman",
      activity: "Duduk diam",
      guide: `
Carilah posisi duduk yang paling nyaman bagi tubuh Anda.
Luangkan 5–10 menit untuk hanya hadir, sambil menarik dan menghembuskan napas secara perlahan.
Bila pikiran datang dan pergi, biarkan saja—tidak perlu dilawan atau diikuti.
Diam hari ini adalah tempat aman untuk beristirahat sejenak.
      `
    },
    {
      title: "Membaca Ringan",
      activity: "Membaca reflektif",
      guide: `
Pilih bacaan pendek yang terasa menenangkan bagi hati.
Baca dengan pelan, tanpa target untuk selesai atau memahami semuanya.
Boleh berhenti kapan saja saat tubuh atau pikiran merasa cukup.
Hari ini, membaca bukan untuk menambah beban, tetapi menemani keheningan.
      `
    },
    {
      title: "Melepaskan Beban",
      activity: "Menuliskan yang mengganggu pikiran",
      guide: `
Tuliskan apa saja yang memenuhi kepala atau terasa memberatkan akhir-akhir ini.
Tidak perlu mencari solusi atau jawaban.
Cukup biarkan semuanya keluar dari pikiran ke atas kertas.
Hari ini, Anda tidak diminta menyelesaikan apa pun—hanya meletakkannya sebentar.
      `
    },
    {
      title: "Menyederhanakan",
      activity: "Menentukan satu fokus hari ini",
      guide: `
Pilih satu hal yang paling penting atau paling mungkin Anda lakukan hari ini.
Tidak harus besar, cukup satu langkah kecil yang terasa realistis.
Izinkan hal-hal lain untuk menunggu tanpa rasa bersalah.
Hari ini, kesederhanaan adalah bentuk kebaikan bagi diri sendiri.
      `
    }
  ],

  fisik: [
    {
      title: "Tidur Lebih Sadar",
      activity: "Menyiapkan tidur",
      guide: `
Menjelang tidur, cobalah mematikan layar sekitar 30 menit lebih awal.
Berbaringlah dengan nyaman, lalu tarik napas perlahan sebanyak lima kali.
Tidak perlu memaksa cepat tidur—cukup izinkan tubuh mengetahui bahwa waktunya beristirahat.
      `
    },
    {
      title: "Peregangan Lembut",
      activity: "Stretching ringan",
      guide: `
Lakukan gerakan sederhana dengan ritme pelan, mengikuti kemampuan tubuh hari ini.
Tidak perlu jauh atau sempurna.
Jika ada bagian yang terasa tidak nyaman, berhentilah dan beri tubuh waktu.
      `
    },
    {
      title: "Jalan Santai",
      activity: "Jalan tanpa target",
      guide: `
Berjalanlah selama 10–20 menit dengan langkah yang paling nyaman bagi Anda.
Tidak ada tujuan khusus—cukup rasakan langkah kaki dan irama napas.
Hari ini, berjalan adalah cara tubuh diajak bernapas kembali.
      `
    },
    {
      title: "Mendengarkan Tubuh",
      activity: "Istirahat aktif",
      guide: `
Ambil waktu untuk duduk atau berbaring dengan sadar.
Perhatikan bagian tubuh yang terasa lelah atau tegang.
Tidak perlu diubah atau diperbaiki—cukup disadari dengan lembut.
      `
    },
    {
      title: "Merawat Tubuh",
      activity: "Satu bentuk self-care",
      guide: `
Pilih satu hal sederhana yang menenangkan tubuh,
seperti minum air hangat, mandi hangat, atau pijat ringan.
Lakukan perlahan, dengan perhatian penuh pada sensasi yang muncul.
Hari ini, merawat tubuh adalah bentuk penghargaan atas semua yang telah dijalaninya.
      `
    }
  ],

  sensorik: [
    {
      title: "Puasa Layar Singkat",
      activity: "Bebas layar",
      guide: `
Luangkan waktu 30–60 menit tanpa gadget apa pun.
Tidak perlu melakukan hal yang produktif atau berguna.
Cukup beri mata dan pikiran kesempatan untuk beristirahat sejenak.
      `
    },
    {
      title: "Keheningan",
      activity: "Duduk dalam sunyi",
      guide: `
Ambil posisi duduk yang paling nyaman.
Tidak perlu musik atau suara tambahan.
Dengarkan saja suara-suara kecil di sekitar Anda, apa adanya.
      `
    },
    {
      title: "Cahaya & Ruang",
      activity: "Menata pencahayaan",
      guide: `
Redupkan lampu di ruang tempat Anda beristirahat.
Jika memungkinkan, bukalah jendela untuk memberi ruang bagi udara dan cahaya alami.
Biarkan suasana yang lebih tenang membantu tubuh melepas ketegangan.
      `
    },
    {
      title: "Suara yang Menenangkan",
      activity: "Mendengar suara alam / instrumental",
      guide: `
Pilih suara yang lembut dan atur volumenya pelan.
Nikmati tanpa sambil mengerjakan hal lain.
Izinkan suara tersebut menemani Anda kembali ke ritme yang lebih tenang.
      `
    },
    {
      title: "Ruang Aman",
      activity: "Merapikan sudut kecil",
      guide: `
Pilih satu sudut kecil yang sering Anda gunakan.
Rapikan secukupnya hingga terasa lebih nyaman.
Tidak perlu rapi sempurna—yang penting ruang itu terasa aman dan menenangkan.
      `
    }
  ],

  spiritual: [
    {
      title: "Hadir dengan Diri",
      activity: "Refleksi singkat",
      guide: `
Luangkan waktu sebentar untuk bertanya dengan jujur pada diri sendiri:
“Apa yang sedang aku rasakan hari ini?”
Tidak perlu jawaban yang baik atau rapi.
Cukup sadari apa yang ada, tanpa menghakimi.
      `
    },
    {
      title: "Keheningan yang Menenangkan",
      activity: "Diam / hening",
      guide: `
Ambil waktu 5–10 menit untuk berhenti dan diam.
Boleh sambil bernapas pelan, atau hanya duduk tenang.
Hari ini, diam bukan kekosongan—melainkan ruang untuk bernapas.
      `
    },
    {
      title: "Doa yang Sederhana",
      activity: "Doa atau refleksi pribadi",
      guide: `
Berdoalah dengan kata-kata yang paling sederhana, atau tanpa kata sama sekali.
Anda tidak perlu merangkai kalimat indah.
Kehadiran Anda apa adanya sudah cukup.
      `
    },
    {
      title: "Menata Arah",
      activity: "Refleksi makna",
      guide: `
Luangkan waktu singkat untuk merenung:
apa yang memberi arti dalam hidup Anda akhir-akhir ini?
Tidak perlu jawaban besar—cukup satu hal kecil yang terasa nyata.
      `
    },
    {
      title: "Syukur Kecil",
      activity: "Menyebutkan tiga hal sederhana",
      guide: `
Pikirkan tiga hal kecil yang terasa baik hari ini.
Tidak harus istimewa atau mengesankan.
Rasakan sejenak kehangatannya, tanpa perlu menjelaskannya pada siapa pun.
      `
    }
  ],

  relasi: [
    {
      title: "Mengakui Kelelahan",
      activity: "Refleksi singkat",
      guide: `
Luangkan sejenak untuk menyadari bagaimana perasaan Anda dalam relasi-relasi hari ini.
Tidak perlu menyalahkan siapa pun, termasuk diri sendiri.
Cukup akui: “Oh, ternyata aku lelah.”
      `
    },
    {
      title: "Percakapan Aman",
      activity: "Berbicara dengan orang tepercaya",
      guide: `
Pilih satu orang yang membuat Anda merasa aman untuk berbagi.
Anda tidak perlu mencari solusi atau memberi penjelasan panjang.
Hari ini, cukup izinkan diri Anda untuk didengar.
      `
    },
    {
      title: "Jeda dari Relasi yang Menguras",
      activity: "Memberi jarak sementara",
      guide: `
Jika memungkinkan, ambil jarak sejenak dari interaksi yang terasa melelahkan.
Ini bukan menjauh selamanya, hanya memberi ruang bernapas bagi diri sendiri.
      `
    },
    {
      title: "Bersama Tanpa Peran",
      activity: "Hadir bersama orang lain",
      guide: `
Habiskan waktu bersama orang atau komunitas tanpa harus berkontribusi apa pun.
Tidak perlu menghibur, membantu, atau menjadi apa-apa.
Cukup hadir sebagai diri sendiri.
      `
    },
    {
      title: "Merasa Ditemani",
      activity: "Menyadari relasi yang menguatkan",
      guide: `
Ingat kembali satu relasi yang membuat Anda merasa lebih ringan.
Rasakan rasa aman atau hangat yang muncul.
Hari ini, biarkan diri Anda ditemani.
      `
    }
  ],

  ekspresif: [
    {
      title: "Ekspresi Bebas",
      activity: "Menulis / menggambar bebas",
      guide: `
Luangkan waktu untuk mengekspresikan apa pun yang ingin keluar dari dalam diri Anda.
Tidak ada yang menilai, dan tidak perlu terlihat bagus.
Hari ini, ekspresi adalah ruang aman—bukan sesuatu yang harus sempurna.
      `
    },
    {
      title: "Musik & Suara",
      activity: "Mendengar atau bernyanyi pelan",
      guide: `
Pilih lagu yang terasa menenangkan bagi hati.
Dengarkan atau nyanyikan dengan pelan.
Biarkan suara menemani Anda kembali pada ritme yang lebih lembut.
      `
    },
    {
      title: "Aktivitas Tangan",
      activity: "Memasak / merapikan / berkebun",
      guide: `
Lakukan satu aktivitas sederhana dengan gerakan yang pelan.
Rasakan setiap prosesnya—sentuhan, aroma, dan irama gerak.
Hari ini, tangan membantu hati untuk beristirahat.
      `
    },
    {
      title: "Menikmati Keindahan",
      activity: "Melihat sesuatu yang indah",
      guide: `
Luangkan waktu untuk memperhatikan keindahan kecil di sekitar Anda.
Berhentilah sejenak dan biarkan diri menikmati tanpa perlu menganalisis.
Keindahan tidak perlu dijelaskan untuk dirasakan.
      `
    },
    {
      title: "Merayakan Kehidupan",
      activity: "Melakukan hal kecil yang disukai",
      guide: `
Pilih sesuatu yang memberi rasa hangat atau ringan bagi Anda.
Lakukan tanpa rasa bersalah dan tanpa target apa pun.
Hari ini, menikmati hidup adalah bagian dari pemulihan.
      `
    }
  ]
};

function renderProgramDays() {
  const container = document.getElementById("programDays");
  if (!container) return;

  container.innerHTML = "";
  const program = programs[state.dominant];
  if (!program) return;

  program.forEach((day, i) => {
    const dayNum = i + 1;
    const locked = dayNum > state.currentDay;

    const card = document.createElement("div");
    card.className = "day-card" + (locked ? " locked" : "");

    card.innerHTML = `
      <h3>Hari ${dayNum} — ${day.title}</h3>
      <p><strong>Aktivitas:</strong> ${day.activity}</p>
      <p>${day.guide}</p>
      ${
        locked
          ? `<p class="soft">🔒 Hari ini akan terbuka setelah hari sebelumnya selesai.</p>`
          : dayNum < 5
            ? `<button class="primary">Saya sudah melakukan ini</button>`
            : `<p>🌱 Terima kasih telah berjalan sejauh ini.</p>`
      }
    `;

    if (!locked && dayNum < 5) {
      card.querySelector("button").addEventListener("click", () => {
        state.currentDay++;
        saveState();
        renderProgramDays();
      });
    }

    container.appendChild(card);
  });
}
function renderProgramDays() {
  const container = document.getElementById("programDays");
  if (!container) return;

  if (!state.dominant) {
    container.innerHTML = "<p>Program belum tersedia.</p>";
    return;
  }

  container.innerHTML = "";
  const program = programs[state.dominant];
  if (!program) return;
}