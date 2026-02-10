/* ===============================
   GLOBAL STATE
=============================== */
const state = {
  name: "",
  age: "",
  role: "",
  answers: {},
  dominant: "",
  currentDay: 1
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
   LABEL DIMENSI
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

  /* ---------- SCREEN 5 : REFLEKSI ---------- */
  function renderReflection() {
    const box = document.getElementById("reflection");
    if (!box) return;

    const reflections = {
      fisik: `
        <p>🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Pelankan ritme dan beri tubuh ruang bernapas.</p>
      `,
      pikiran: `
        <p>🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Tidak semua hal harus dipikirkan hari ini.</p>
      `,
      emosional: `
        <p>💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Akui dulu apa yang dirasakan.</p>
      `,
      sensorik: `
        <p>🌱 Indra Anda mungkin sudah terlalu lama sibuk.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Beri mata dan telinga jeda.</p>
      `,
      relasi: `
        <p>🤍 Anda banyak hadir untuk orang lain.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Hadir juga untuk diri sendiri.</p>
      `,
      ekspresif: `
        <p>✨ Sisi kreatif Anda tidak hilang.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Lakukan satu hal kecil yang Anda sukai.</p>
      `,
      spiritual: `
        <p>🕯️ Ada kerinduan untuk menata arah.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Luangkan waktu hening.</p>
      `
    };

    const label = DIMENSION_LABEL[state.dominant] || "Satu Bagian Diri";

    box.innerHTML = `
      <p><strong>
        Setiap jawaban yang Anda berikan adalah cerita kecil tentang kondisi Anda saat ini.<br>
        Dari sana, terlihat satu area yang sedang paling membutuhkan ruang untuk dipedulikan:
      </strong></p>
      <p><strong>${label}</strong></p>
      ${reflections[state.dominant]}
    `;
  }

  /* ---------- SCREEN 7 : PROGRAM 5 HARI ---------- */
  function renderProgramDays() {
    const container = document.getElementById("programDays");
    if (!container) return;

    const program = programs[state.dominant];
    if (!program) {
      container.innerHTML = "<p>Program belum tersedia.</p>";
      return;
    }

    container.innerHTML = `
      <h3>${program.title}</h3>
      <p class="soft">
        Mulailah dengan Hari 1. Hari berikutnya akan terbuka secara bertahap,
        mengikuti ritme pemulihan Anda.
      </p>
    `;

    program.days.forEach(day => {
      const card = document.createElement("div");
      card.className = "day-card";

      if (day.day > state.currentDay) {
        card.classList.add("locked");
        card.innerHTML = `
          <h4>Hari ${day.day} — ${day.title}</h4>
          <p class="soft">Terkunci</p>
        `;
      } else {
        card.innerHTML = `
          <h4>Hari ${day.day} — ${day.title}</h4>
          <p><strong>Aktivitas:</strong> ${day.activity}</p>
          <ul>${day.guide.map(g => `<li>${g}</li>`).join("")}</ul>
          <button class="primary" id="finish-day-${day.day}">
            Saya sudah menyelesaikan hari ini
          </button>
        `;
      }

      container.appendChild(card);
    });

    attachFinishHandler();
  }

  function attachFinishHandler() {
    const btn = document.getElementById(`finish-day-${state.currentDay}`);
    if (!btn) return;

    btn.addEventListener("click", () => {
      state.currentDay++;
      if (state.currentDay <= 5) {
        renderProgramDays();
      } else {
        showCompletionMessage();
      }
    });
  }

  function showCompletionMessage() {
    const container = document.getElementById("programDays");
    container.innerHTML = `
      <h3>🌱 Terima kasih telah berjalan sejauh ini</h3>
      <p>
        Anda telah menyelesaikan perjalanan 5 hari pemulihan
        dengan ritme Anda sendiri.
      </p>
      <p>
        Bagaimana perjalanan Anda bersama kami?
        Jika ingin melanjutkan, kami siap menemani langkah berikutnya.
      </p>
    `;
  }

  /* ---------- EVENT TOMBOL ---------- */
  btnResult.addEventListener("click", () => {
    calculateResult();
    renderReflection();
    goTo(5);
  });

  document.querySelector("#screen-6 button.primary")
    .addEventListener("click", () => {
      goTo(7);
      renderProgramDays();
    });

});
