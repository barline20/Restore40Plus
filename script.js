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
   LOCAL STORAGE (AUTOSAVE)
====================================================== */
function saveState() {
  localStorage.setItem("restore40_state", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("restore40_state");
  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }
}

function saveScreen(screen) {
  localStorage.setItem("restore40_screen", screen);
}

function loadScreen() {
  return localStorage.getItem("restore40_screen");
}

/* ======================================================
   NAVIGASI SCREEN
====================================================== */
window.goTo = function (target) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
  });

  const next = document.getElementById(`screen-${target}`);
  if (next) {
    next.classList.add("active");
    window.scrollTo(0, 0);
    saveScreen(target);
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

  loadState();

  /* ---------- SCREEN AWAL (RESTORE) ---------- */
  const lastScreen = loadScreen();
  if (lastScreen) {
    goTo(lastScreen);
  } else {
    goTo(1);
  }

  /* ---------- SCREEN 2 : PROFIL ---------- */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  if (nameInput) nameInput.value = state.name || "";
  if (ageInput) ageInput.value = state.age || "";

  function checkProfileFilled() {
    if (!btnNextProfile) return;
    btnNextProfile.disabled = !(nameInput.value.trim() && ageInput.value.trim());
  }

  nameInput?.addEventListener("input", () => {
    state.name = nameInput.value.trim();
    saveState();
    checkProfileFilled();
  });

  ageInput?.addEventListener("input", () => {
    state.age = ageInput.value.trim();
    saveState();
    checkProfileFilled();
  });

  checkProfileFilled();

  btnNextProfile?.addEventListener("click", () => {
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
        saveState();
        btnStart.disabled = false;
      }
    });
  });

  customRole?.addEventListener("input", () => {
    if (customRole.value.trim()) {
      state.role = customRole.value.trim();
      saveState();
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

  if (questionBox && Array.isArray(questions)) {
    questionBox.innerHTML = "";

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

        if (state.answers[q.id] === label) {
          opt.classList.add("selected");
        }

        opt.addEventListener("click", () => {
          options.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
          opt.classList.add("selected");
          state.answers[q.id] = label;
          saveState();
          checkAllAnswered();
        });

        options.appendChild(opt);
      });

      card.appendChild(text);
      card.appendChild(options);
      questionBox.appendChild(card);
    });
  }

  /* ---------- HITUNG & REFLEKSI ---------- */
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
    saveState();
  }

  function renderReflection() {
    const box = document.getElementById("reflection");
    if (!box) return;

    const titles = {
      fisik: "Istirahat Fisik",
      pikiran: "Istirahat Pikiran",
      emosional: "Istirahat Emosional",
      sensorik: "Istirahat Sensorik",
      relasi: "Istirahat Relasi",
      ekspresif: "Istirahat Ekspresif",
      spiritual: "Istirahat Spiritual"
    };

    box.innerHTML = `
      <p>
        Setiap jawaban yang Anda berikan adalah cerita kecil tentang kondisi Anda saat ini.
        Dari sana, terlihat satu area yang sedang paling membutuhkan ruang untuk dipedulikan:
        <strong>${titles[state.dominant]}</strong>.
      </p>
    `;
  }

  btnResult?.addEventListener("click", () => {
    calculateResult();
    renderReflection();
    goTo(5);
  });

});
