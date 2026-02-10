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
   INIT
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- SCREEN 1 ---------- */
  goTo(1);

  /* ---------- SCREEN 2 ---------- */
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

  /* ---------- SCREEN 3 ---------- */
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

  /* ---------- HASIL ---------- */
  function calculateResult() {
    const scores = {};

    questions.forEach(q => {
      const val = SCORE_MAP[state.answers[q.id]] || 0;
      scores[q.dimension] = (scores[q.dimension] || 0) + val;
    });

    state.dominant = Object.keys(scores)
      .reduce((a, b) => scores[a] > scores[b] ? a : b);
  }

  function renderReflection() {
    const box = document.getElementById("reflection");

    const reflections = {
      fisik: "🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.",
      pikiran: "🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.",
      emosional: "💛 Ada perasaan yang mungkin selama ini Anda tahan sendiri.",
      sensorik: "🌱 Indra Anda mungkin sudah terlalu lama sibuk.",
      relasi: "🤍 Anda banyak hadir untuk orang lain.",
      ekspresif: "✨ Bagian diri Anda yang menikmati hal sederhana masih ada.",
      spiritual: "🕯️ Ada kerinduan untuk menata arah."
    };

    box.innerHTML = `
      <p><strong>Area utama yang menonjol:</strong></p>
      <p>${reflections[state.dominant]}</p>
    `;
  }

  btnResult.addEventListener("click", () => {
    calculateResult();
    renderReflection();
    goTo(5);
  });
});