/* ======================================================
   GLOBAL STATE
====================================================== */
const state = {
  name: "",
  age: "",
  role: "",
  phone: "",
  answers: {},
  dominant: ""
};

/* ======================================================
   NAVIGASI SCREEN (GLOBAL)
====================================================== */
window.goTo = function (target) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
  });

  const next = document.getElementById(`screen-${target}`);
  if (next) {
    next.classList.add("active");
    window.scrollTo(0, 0);
  }
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

  /* ---------- SCREEN 1 ---------- */
  goTo(1);

  /* ---------- SCREEN 2 : PROFIL ---------- */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  function checkProfileFilled() {
    if (!btnNextProfile) return;
    btnNextProfile.disabled = !(nameInput.value.trim() && ageInput.value.trim());
  }

  nameInput?.addEventListener("input", checkProfileFilled);
  ageInput?.addEventListener("input", checkProfileFilled);

  btnNextProfile?.addEventListener("click", () => {
    state.name = nameInput.value.trim();
    state.age = ageInput.value.trim();
    goTo(3);
  });

  /* ---------- SCREEN 3 : PERAN ---------- */
  const roleOptions = document.querySelectorAll("#screen-3 .option");
  const customRole = document.getElementById("customRole");
  const btnStart = document.getElementById("btnStart");

  if (customRole) customRole.style.display = "none";
  if (btnStart) btnStart.disabled = true;

  roleOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      roleOptions.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");

      const value = opt.textContent.trim();

      if (value === "Lainnya") {
        customRole.style.display = "block";
        customRole.value = "";
        btnStart.disabled = true;
      } else {
        customRole.style.display = "none";
        state.role = value;
        btnStart.disabled = false;
      }
    });
  });

  customRole?.addEventListener("input", () => {
    if (customRole.value.trim()) {
      state.role = customRole.value.trim();
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
    }
  });

  btnStart?.addEventListener("click", () => goTo(4));

  /* ---------- SCREEN 4 : PERTANYAAN ---------- */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");
  if (btnResult) btnResult.disabled = true;

  function checkAllAnswered() {
    btnResult.disabled = Object.keys(state.answers).length !== questions.length;
  }

  questions.forEach(q => {
    const card = document.createElement("div");
    card.className = "question-card";

    const text = document.createElement("p");
    text.textContent = q.text;

    const options = document.createElement("div");

    ["Ya", "Terkadang", "Tidak"].forEach(label => {
      const opt = document.createElement("div");
      opt.className = "answer";
      opt.textContent = label;

      opt.addEventListener("click", () => {
        options.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
        opt.classList.add("selected");
        state.answers[q.id] = label;
        checkAllAnswered();
      });

      options.appendChild(opt);
    });

    card.appendChild(text);
    card.appendChild(options);
    questionBox.appendChild(card);
  });

  /* ---------- HITUNG HASIL ---------- */
  function calculateResult() {
    const scores = {};

    questions.forEach(q => {
      const answer = state.answers[q.id];
      const value = SCORE_MAP[answer] || 0;
      scores[q.dimension] = (scores[q.dimension] || 0) + value;
    });

    let max = -1;
    let dominant = "";

    Object.entries(scores).forEach(([dim, score]) => {
      if (score > max) {
        max = score;
        dominant = dim;
      }
    });

    state.dominant = dominant;
  }

  /* ---------- REFLEKSI ---------- */
  function renderReflection() {
    const box = document.getElementById("reflection");

    const titles = {
      fisik: "Istirahat Fisik",
      pikiran: "Istirahat Mental",
      emosional: "Istirahat Emosional",
      sensorik: "Istirahat Sensorik",
      relasi: "Istirahat Relasi",
      ekspresif: "Istirahat Ekspresif",
      spiritual: "Istirahat Spiritual"
    };

    const reflections = {
      fisik: `
      🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.
      Mungkin bukan karena aktivitas berat, tetapi karena terus berjalan tanpa benar-benar berhenti.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Pelankan ritme dan beri tubuh ruang untuk bernapas.
      `,
      pikiran: `
      🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.
      Bahkan saat diam, kepala masih penuh oleh banyak hal.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Tidak semua hal harus dipikirkan hari ini.
      `,
      emosional: `
      💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.
      Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Akui dulu apa yang sedang dirasakan.
      `,
      sensorik: `
      🌱 Indra Anda mungkin sudah terlalu lama sibuk.
      Layar, suara, dan aktivitas terus-menerus bisa melelahkan tubuh.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Beri mata dan telinga jeda sejenak.
      `,
      relasi: `
      🤍 Anda banyak hadir untuk orang lain.
      Kadang tanpa sadar, diri sendiri jadi belakangan.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Hadir juga untuk diri sendiri.
      `,
      ekspresif: `
      ✨ Sisi diri yang menikmati hal-hal sederhana masih ada.
      Mungkin tertutup oleh kesibukan, bukan hilang.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Lakukan satu hal kecil yang Anda sukai.
      `,
      spiritual: `
      🕯️ Ada kerinduan untuk berhenti sejenak dan menata arah.
      Itu wajar setelah perjalanan panjang.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
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

  btnResult?.addEventListener("click", () => {
    calculateResult();
    renderReflection();
    goTo(5);
  });

  /* ---------- SCREEN 6 : SUBMIT HP ---------- */
  const btnSubmitPhone = document.getElementById("btnSubmitPhone");
  const phoneInput = document.getElementById("phone");

  btnSubmitPhone?.addEventListener("click", () => {
    if (!phoneInput.value.trim()) {
      alert("Silakan masukkan nomor HP Anda 🤍");
      return;
    }
    state.phone = phoneInput.value.trim();
    goTo(7);
    renderProgramDays();
  });

});

/* ======================================================
   PROGRAM 5 HARI (DAY 1 TERBUKA)
====================================================== */
function renderProgramDays() {
  const container = document.getElementById("programDays");
  container.innerHTML = "";

  const program = programs[state.dominant];

  program.forEach((day, index) => {
    const card = document.createElement("div");
    card.className = "day-card";
    if (index > 0) card.classList.add("locked");

    card.innerHTML = `
      <h3>Hari ${index + 1} — ${day.title}</h3>
      <p><strong>Aktivitas:</strong> ${day.activity}</p>
      <p>${day.guide}</p>
    `;

    container.appendChild(card);
  });
}
