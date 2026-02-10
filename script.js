/* ===============================
   GLOBAL STATE
=============================== */
const state = {
  name: "",
  age: "",
  role: "",
  answers: {},
  dominant: ""
};

/* ===============================
   NAVIGASI SCREEN
=============================== */
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

/* ===============================
   KONVERSI SKOR
=============================== */
const SCORE_MAP = {
  "Ya": 3,
  "Terkadang": 2,
  "Tidak": 1
};

/* ===============================
   LABEL DIMENSI (UNTUK HASIL)
=============================== */
const DIMENSION_LABEL = {
  fisik: "Kelelahan Fisik",
  pikiran: "Kelelahan Pikiran",
  emosional: "Kelelahan Emosional",
  sensorik: "Kelelahan Sensorik",
  relasi: "Kelelahan Relasi",
  ekspresif: "Kelelahan Ekspresif",
  spiritual: "Kelelahan Spiritual"
};

/* ===============================
   INIT
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- SCREEN 1 ---------- */
  goTo(1);

  /* ---------- SCREEN 2 : PROFIL ---------- */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  function checkProfile() {
    btnNextProfile.disabled = !(nameInput.value.trim() && ageInput.value.trim());
  }

  nameInput.addEventListener("input", checkProfile);
  ageInput.addEventListener("input", checkProfile);

  btnNextProfile.addEventListener("click", () => {
    state.name = nameInput.value.trim();
    state.age = ageInput.value.trim();
    goTo(3);
  });

  /* ---------- SCREEN 3 : PERAN ---------- */
  const roleOptions = document.querySelectorAll("#screen-3 .option");
  const customRole = document.getElementById("customRole");
  const btnStart = document.getElementById("btnStart");

  customRole.style.display = "none";
  btnStart.disabled = true;

  roleOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      roleOptions.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");

      const value = opt.textContent.trim();

      if (value === "Lainnya") {
        customRole.style.display = "block";
        btnStart.disabled = true;
      } else {
        customRole.style.display = "none";
        state.role = value;
        btnStart.disabled = false;
      }
    });
  });

  customRole.addEventListener("input", () => {
    state.role = customRole.value.trim();
    btnStart.disabled = !state.role;
  });

  btnStart.addEventListener("click", () => goTo(4));

  /* ---------- SCREEN 4 : PERTANYAAN ---------- */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");
  btnResult.disabled = true;

  function checkAllAnswered() {
    btnResult.disabled =
      Object.keys(state.answers).length !== questions.length;
  }

  questions.forEach(q => {
    const card = document.createElement("div");
    card.className = "question-card";

    const p = document.createElement("p");
    p.textContent = q.text;

    const answers = document.createElement("div");

    ["Ya", "Terkadang", "Tidak"].forEach(label => {
      const a = document.createElement("div");
      a.className = "answer";
      a.textContent = label;

      a.addEventListener("click", () => {
        answers.querySelectorAll(".answer")
          .forEach(x => x.classList.remove("selected"));
        a.classList.add("selected");

        state.answers[q.id] = label;
        checkAllAnswered();
      });

      answers.appendChild(a);
    });

    card.appendChild(p);
    card.appendChild(answers);
    questionBox.appendChild(card);
  });

  /* ---------- HITUNG HASIL ---------- */
  function calculateResult() {
    const scores = {};

    questions.forEach(q => {
      const val = SCORE_MAP[state.answers[q.id]] || 0;
      scores[q.dimension] = (scores[q.dimension] || 0) + val;
    });

    state.dominant = Object.keys(scores)
      .reduce((a, b) => scores[a] > scores[b] ? a : b);
  }

  /* ---------- TAMPILKAN REFLEKSI ---------- */
  function renderReflection() {
    const box = document.getElementById("reflection");
    if (!box) return;

    const reflections = {
      fisik: `
        <p>🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.
        Mungkin bukan karena aktivitas berat, tetapi karena terus berjalan tanpa benar-benar berhenti.</p>

        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Pelankan ritme sedikit saja, dan beri tubuh ruang untuk bernapas.</p>
      `,
      pikiran: `
        <p>🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.
        Bahkan saat diam, kepala masih penuh dengan banyak hal.</p>

        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Tidak semua hal harus dipikirkan hari ini. Sebagian boleh ditaruh dulu.</p>
      `,
      emosional: `
        <p>💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.
        Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.</p>

        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Perhatikan dulu apa yang sedang Anda rasakan—cukup diakui.</p>
      `,
      sensorik: `
        <p>🌱 Indra Anda mungkin sudah terlalu lama sibuk.
        Layar, suara, dan aktivitas terus-menerus membuat tubuh sulit benar-benar tenang.</p>

        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Beri mata dan telinga jeda sejenak, cari suasana yang lebih lembut.</p>
      `,
      relasi: `
        <p>🤍 Anda banyak hadir untuk orang lain.
        Kadang tanpa sadar, diri sendiri jadi belakangan.</p>

        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Dekatlah dengan orang yang membuat Anda merasa aman—cukup hadir.</p>
      `,
      ekspresif: `
        <p>✨ Bagian diri Anda yang menikmati hal-hal sederhana masih ada.
        Mungkin tertutup oleh kesibukan, bukan hilang.</p>

        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Lakukan satu hal kecil yang Anda sukai hari ini, tanpa target.</p>
      `,
      spiritual: `
        <p>🕯️ Ada keinginan untuk berhenti sejenak dan menata arah.
        Itu wajar setelah perjalanan yang panjang.</p>

        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Luangkan waktu hening yang singkat—dalam doa, refleksi, atau diam saja.</p>
      `
    };

    const areaLabel = DIMENSION_LABEL[state.dominant] || "Satu Bagian Diri";

    box.innerHTML = `
      <p><strong>
        Setiap jawaban yang Anda berikan adalah cerita kecil tentang kondisi Anda saat ini.<br>
        Dari sana, terlihat satu area yang sedang paling membutuhkan ruang untuk dipedulikan:
      </strong></p>

      <p style="margin-top:8px; font-size:1.05rem;">
        <strong>${areaLabel}</strong>
      </p>

      ${reflections[state.dominant] || `
        <p>Terima kasih telah meluangkan waktu untuk jujur pada diri sendiri hari ini.</p>
      `}
    `;
  }

  btnResult.addEventListener("click", () => {
    calculateResult();
    renderReflection();
    goTo(5);
  });
});
