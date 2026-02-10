/* ==============================
   GLOBAL STATE
============================== */
const state = {
  answers: {},
  dominant: ""
};

/* ==============================
   NAVIGASI SCREEN
============================== */
window.goTo = function (target) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  const next = document.getElementById(`screen-${target}`);
  if (next) next.classList.add("active");
};

/* ==============================
   SCORE
============================== */
const SCORE_MAP = { Ya: 3, Terkadang: 2, Tidak: 1 };

/* ==============================
   DOM READY
============================== */
document.addEventListener("DOMContentLoaded", () => {

  goTo(1);

  /* ===== SCREEN 4 : QUESTIONS ===== */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");

  if (!questionBox || typeof questions === "undefined") return;

  btnResult.disabled = true;

  function checkAnswered() {
    btnResult.disabled =
      Object.keys(state.answers).length !== questions.length;
  }

  questions.forEach(q => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `<p>${q.text}</p>`;

    const opts = document.createElement("div");

    ["Ya", "Terkadang", "Tidak"].forEach(v => {
      const o = document.createElement("div");
      o.className = "answer";
      o.textContent = v;

      o.onclick = () => {
        opts.querySelectorAll(".answer")
          .forEach(a => a.classList.remove("selected"));
        o.classList.add("selected");
        state.answers[q.id] = v;
        checkAnswered();
      };
      opts.appendChild(o);
    });

    card.appendChild(opts);
    questionBox.appendChild(card);
  });

  /* ===== RESULT ===== */
  btnResult.onclick = () => {
    calculateResult();
    renderReflection();
    goTo(5);
  };

  /* ===== SUBMIT PHONE ===== */
  const submitBtn = document.querySelector("#screen-6 button");

  submitBtn.onclick = () => {
    goTo(7);
    renderProgramDays();
  };
});

/* ==============================
   HITUNG HASIL
============================== */
function calculateResult() {
  const scores = {};

  questions.forEach(q => {
    const val = SCORE_MAP[state.answers[q.id]] || 0;
    scores[q.dimension] = (scores[q.dimension] || 0) + val;
  });

  let max = -1;
  let dom = "";

  for (const d in scores) {
    if (scores[d] > max) {
      max = scores[d];
      dom = d;
    }
  }

  state.dominant = dom;
}

/* ==============================
   REFLECTION
============================== */
function renderReflection() {
  const box = document.getElementById("reflection");

  const label = {
    fisik: "Istirahat Fisik",
    pikiran: "Istirahat Mental",
    emosional: "Istirahat Emosional",
    sensorik: "Istirahat Sensorik",
    relasi: "Istirahat Relasi",
    ekspresif: "Istirahat Ekspresif",
    spiritual: "Istirahat Spiritual"
  };

  box.innerHTML = `
    <p>
      Setiap jawaban yang Anda berikan adalah cerita kecil tentang kondisi Anda.
      Dari sana terlihat satu area yang sedang paling membutuhkan ruang
      untuk dipedulikan:
      <strong>${label[state.dominant]}</strong>.
    </p>
  `;
}

/* ==============================
   PROGRAM 5 HARI
============================== */
function renderProgramDays() {
  const wrap = document.getElementById("programDays");
  wrap.innerHTML = "";

  if (!programs || !programs[state.dominant]) {
    wrap.innerHTML = "<p>Program sedang disiapkan 🤍</p>";
    return;
  }

  programs[state.dominant].forEach((d, i) => {
    const card = document.createElement("div");
    card.className = "day-card";
    if (i > 0) card.classList.add("locked");

    card.innerHTML = `
      <h3>Hari ${i + 1} — ${d.title}</h3>
      <p><strong>Aktivitas:</strong> ${d.activity}</p>
      <p>${d.guide}</p>
      ${i > 0 ? "<p class='soft'>🔒 Terkunci</p>" : ""}
    `;

    wrap.appendChild(card);
  });
}