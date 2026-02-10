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
   NAVIGASI SCREEN
====================================================== */
window.goTo = function (target) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );

  const next = document.getElementById(`screen-${target}`);
  if (next) {
    next.classList.add("active");
    window.scrollTo(0, 0);
  }
};

/* ======================================================
   SKOR JAWABAN
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
    btnNextProfile.disabled = !(
      nameInput.value.trim() &&
      ageInput.value.trim()
    );
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

  customRole.style.display = "none";
  btnStart.disabled = true;

  roleOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      roleOptions.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");

      if (opt.textContent.trim() === "Lainnya") {
        customRole.style.display = "block";
        btnStart.disabled = true;
      } else {
        customRole.style.display = "none";
        state.role = opt.textContent.trim();
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
  btnResult.disabled = true;

  function checkAllAnswered() {
    btnResult.disabled =
      Object.keys(state.answers).length !== questions.length;
  }

  questions.forEach(q => {
    const card = document.createElement("div");
    card.className = "question-card";

    card.innerHTML = `<p>${q.text}</p>`;
    const options = document.createElement("div");

    ["Ya", "Terkadang", "Tidak"].forEach(label => {
      const opt = document.createElement("div");
      opt.className = "answer";
      opt.textContent = label;

      opt.addEventListener("click", () => {
        options.querySelectorAll(".answer")
          .forEach(a => a.classList.remove("selected"));
        opt.classList.add("selected");

        state.answers[q.id] = label;
        checkAllAnswered();
      });

      options.appendChild(opt);
    });

    card.appendChild(options);
    questionBox.appendChild(card);
  });

  /* ---------- HITUNG HASIL ---------- */
  function calculateResult() {
    const scores = {};

    questions.forEach(q => {
      const value = SCORE_MAP[state.answers[q.id]] || 0;
      scores[q.dimension] = (scores[q.dimension] || 0) + value;
    });

    let max = -1;
    let dominant = "";

    for (const dim in scores) {
      if (scores[dim] > max) {
        max = scores[dim];
        dominant = dim;
      }
    }

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
      fisik: "🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.",
      pikiran: "🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.",
      emosional: "💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.",
      sensorik: "🌱 Indra Anda mungkin sudah terlalu lama sibuk.",
      relasi: "🤍 Anda banyak hadir untuk orang lain.",
      ekspresif: "✨ Sisi kreatif Anda masih ada, hanya tertutup sementara.",
      spiritual: "🕯️ Ada kerinduan untuk berhenti sejenak dan menata arah."
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

    // penting untuk GitHub Pages
    setTimeout(renderProgramDays, 0);
  });
});

/* ======================================================
   PROGRAM 5 HARI (DAY 1 TERBUKA)
====================================================== */
function renderProgramDays() {
  const container = document.getElementById("programDays");
  container.innerHTML = "";

  const program = programs[state.dominant];

  if (!program) {
    container.innerHTML = `
      <p class="soft">
        Program pemulihan sedang disiapkan 🤍
      </p>`;
    return;
  }

  program.forEach((day, index) => {
    const card = document.createElement("div");
    card.className = "day-card";
    if (index > 0) card.classList.add("locked");

    card.innerHTML = `
      <h3>Hari ${index + 1} — ${day.title}</h3>
      <p><strong>Aktivitas:</strong> ${day.activity}</p>
      <p>${day.guide}</p>
      ${index > 0 ? "<p class='soft'>🔒 Akan terbuka setelah hari sebelumnya</p>" : ""}
    `;

    container.appendChild(card);
  });
}