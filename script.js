/* ======================================================
   GLOBAL STATE (TANPA AUTOSAVE SCREEN)
====================================================== */
const state = {
  name: "",
  age: "",
  role: "",
  phone: "",
  answers: {},
  dominant: "",
  currentDay: 1
};

/* ======================================================
   NAVIGASI SCREEN
====================================================== */
window.goTo = function (target) {
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
  goTo(1);

  /* ================= SCREEN 2 ================= */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  function checkProfile() {
    btnNextProfile.disabled = !(nameInput.value.trim() && ageInput.value.trim());
  }

  nameInput?.addEventListener("input", checkProfile);
  ageInput?.addEventListener("input", checkProfile);

  btnNextProfile?.addEventListener("click", () => {
    state.name = nameInput.value.trim();
    state.age = ageInput.value.trim();
    goTo(3);
  });

  /* ================= SCREEN 3 ================= */
  const roleOptions = document.querySelectorAll("#screen-3 .option");
  const customRole = document.getElementById("customRole");
  const btnStart = document.getElementById("btnStart");

  customRole.style.display = "none";
  btnStart.disabled = true;

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
        btnStart.disabled = false;
      }
    });
  });

  customRole?.addEventListener("input", () => {
    state.role = customRole.value.trim();
    btnStart.disabled = !state.role;
  });

  btnStart?.addEventListener("click", () => goTo(4));

  /* ================= SCREEN 4 ================= */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");
  btnResult.disabled = true;

  function checkAnswered() {
    btnResult.disabled = Object.keys(state.answers).length !== questions.length;
  }

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

      o.addEventListener("click", () => {
        opts.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
        o.classList.add("selected");
        state.answers[q.id] = label;
        checkAnswered();
      });

      opts.appendChild(o);
    });

    card.appendChild(p);
    card.appendChild(opts);
    questionBox.appendChild(card);
  });

  btnResult.addEventListener("click", () => {
    calculateResult();
    renderReflection();
    goTo(5);
  });

  /* ================= SCREEN 6 ================= */
  const phoneInput = document.getElementById("phone");
  const btnSubmitPhone = document.getElementById("btnSubmitPhone");

  btnSubmitPhone.addEventListener("click", () => {
    if (!phoneInput.value.trim()) {
      alert("Silakan masukkan nomor HP Anda 🤍");
      return;
    }
    state.phone = phoneInput.value.trim();
    state.currentDay = 1;
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
}

/* ======================================================
   REFLEKSI
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

  const texts = {
    fisik: "🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.",
    pikiran: "🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.",
    emosional: "💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.",
    sensorik: "🌱 Indra Anda mungkin sudah terlalu lama sibuk.",
    relasi: "🤍 Anda banyak hadir untuk orang lain.",
    ekspresif: "✨ Bagian diri Anda yang menikmati hal-hal sederhana masih ada.",
    spiritual: "🕯️ Ada keinginan untuk berhenti sejenak dan menata arah."
  };

  box.innerHTML = `
    <p>
      Setiap jawaban yang Anda berikan adalah cerita kecil tentang kondisi Anda saat ini.
      Dari sana, terlihat satu area yang paling membutuhkan perhatian:
      <strong>${titles[state.dominant]}</strong>.
    </p>
    <p>${texts[state.dominant]}</p>
  `;
}

/* ======================================================
   PROGRAM 5 HARI
====================================================== */
const programs = {
  fisik: [
    { title: "Tidur Lebih Sadar", activity: "Menyiapkan tidur", guide: "Matikan layar lebih awal dan tarik napas perlahan." },
    { title: "Peregangan Lembut", activity: "Stretching ringan", guide: "Gerakkan tubuh perlahan sesuai kemampuan." },
    { title: "Jalan Santai", activity: "Jalan tanpa target", guide: "Berjalan 10–20 menit dengan ritme nyaman." },
    { title: "Mendengarkan Tubuh", activity: "Istirahat aktif", guide: "Sadari bagian tubuh yang lelah." },
    { title: "Merawat Tubuh", activity: "Self-care sederhana", guide: "Lakukan satu hal yang menenangkan tubuh." }
  ],
  pikiran: [
    { title: "Mengosongkan Kepala", activity: "Menulis bebas", guide: "Tuliskan apa pun tanpa disaring." },
    { title: "Diam yang Aman", activity: "Duduk diam", guide: "Bernapas pelan 5–10 menit." },
    { title: "Membaca Ringan", activity: "Membaca reflektif", guide: "Baca tanpa target." },
    { title: "Melepaskan Beban", activity: "Menulis beban pikiran", guide: "Letakkan beban di kertas." },
    { title: "Menyederhanakan", activity: "Satu fokus hari ini", guide: "Pilih satu hal kecil." }
  ],
  sensorik: [
    { title: "Puasa Layar", activity: "Bebas gadget", guide: "30–60 menit tanpa layar." },
    { title: "Keheningan", activity: "Duduk sunyi", guide: "Dengarkan sekitar." },
    { title: "Cahaya & Ruang", activity: "Menata pencahayaan", guide: "Gunakan cahaya lembut." },
    { title: "Suara Menenangkan", activity: "Musik lembut", guide: "Dengarkan tanpa multitasking." },
    { title: "Ruang Aman", activity: "Merapikan sudut kecil", guide: "Buat satu ruang nyaman." }
  ],
  emosional: [
    { title: "Menyadari Perasaan", activity: "Refleksi singkat", guide: "Akui apa yang dirasakan." },
    { title: "Menulis Perasaan", activity: "Menulis bebas", guide: "Tanpa perlu rapi." },
    { title: "Jeda Emosi", activity: "Diam sejenak", guide: "Bernapas dan hadir." },
    { title: "Belas Kasih", activity: "Self-kindness", guide: "Bersikap lembut pada diri." },
    { title: "Menguatkan Diri", activity: "Hal kecil yang menguatkan", guide: "Rayakan langkah kecil." }
  ],
  relasi: [
    { title: "Mengakui Lelah", activity: "Refleksi relasi", guide: "Sadari kelelahan relasi." },
    { title: "Percakapan Aman", activity: "Berbagi", guide: "Bicara dengan orang tepercaya." },
    { title: "Memberi Jeda", activity: "Mengambil jarak", guide: "Tarik napas dari relasi berat." },
    { title: "Hadir Tanpa Peran", activity: "Bersama tanpa tuntutan", guide: "Cukup hadir." },
    { title: "Merasa Ditemani", activity: "Mengingat relasi hangat", guide: "Rasakan kehadiran." }
  ],
  ekspresif: [
    { title: "Ekspresi Bebas", activity: "Menulis/menggambar", guide: "Tanpa target." },
    { title: "Musik & Suara", activity: "Mendengar lagu", guide: "Biarkan suara menemani." },
    { title: "Aktivitas Tangan", activity: "Memasak/berkebun", guide: "Rasakan proses." },
    { title: "Menikmati Keindahan", activity: "Mengamati", guide: "Nikmati tanpa analisis." },
    { title: "Merayakan Hidup", activity: "Hal kecil yang disukai", guide: "Tanpa rasa bersalah." }
  ],
  spiritual: [
    { title: "Hadir dengan Diri", activity: "Refleksi", guide: "Sadari apa yang ada." },
    { title: "Keheningan", activity: "Diam", guide: "Bernapas pelan." },
    { title: "Doa Sederhana", activity: "Doa/refleksi", guide: "Apa adanya." },
    { title: "Menata Arah", activity: "Refleksi makna", guide: "Satu hal bermakna." },
    { title: "Syukur Kecil", activity: "Menyebutkan syukur", guide: "Tiga hal sederhana." }
  ]
};

function renderProgramDays() {
  const container = document.getElementById("programDays");
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
          ? `<p class="soft">🔒 Hari ini masih terkunci</p>`
          : dayNum < 5
            ? `<button class="primary">Saya sudah melakukan ini</button>`
            : `<p>🌱 Terima kasih telah berjalan sejauh ini</p>`
      }
    `;

    if (!locked && dayNum < 5) {
      card.querySelector("button").addEventListener("click", () => {
        state.currentDay++;
        renderProgramDays();
      });
    }

    container.appendChild(card);
  });
}