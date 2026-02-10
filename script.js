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
   NAVIGASI SCREEN (GLOBAL)
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

  const btnConsent = document.getElementById("btnConsent");
  if (btnConsent) {
    btnConsent.addEventListener("click", () => goTo(2));
  }

  /* ---------- SCREEN 2 ---------- */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  function checkProfileFilled() {
    if (!btnNextProfile) return;
    btnNextProfile.disabled = !(nameInput.value.trim() && ageInput.value.trim());
  }

  if (nameInput && ageInput) {
    nameInput.addEventListener("input", checkProfileFilled);
    ageInput.addEventListener("input", checkProfileFilled);
  }

  if (btnNextProfile) {
    btnNextProfile.addEventListener("click", () => {
      state.name = nameInput.value.trim();
      state.age = ageInput.value.trim();
      goTo(3);
    });
  }

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

  if (customRole) {
    customRole.addEventListener("input", () => {
      if (customRole.value.trim()) {
        state.role = customRole.value.trim();
        btnStart.disabled = false;
      } else {
        btnStart.disabled = true;
      }
    });
  }

  if (btnStart) {
    btnStart.addEventListener("click", () => goTo(4));
  }

  /* ---------- SCREEN 4 : PERTANYAAN ---------- */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");

  if (btnResult) btnResult.disabled = true;

  function checkAllAnswered() {
    if (!btnResult) return;
    btnResult.disabled = Object.keys(state.answers).length !== questions.length;
  }

  if (questionBox && Array.isArray(questions)) {
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
          options.querySelectorAll(".answer")
            .forEach(a => a.classList.remove("selected"));
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
  }

  /* ---------- HITUNG HASIL ---------- */
  function calculateResult() {
    const scores = {};

    questions.forEach(q => {
      const answerText = state.answers[q.id];
      const value = SCORE_MAP[answerText] || 0;

      if (!scores[q.dimension]) scores[q.dimension] = 0;
      scores[q.dimension] += value;
    });

    let dominant = "";
    let maxScore = -1;

    for (const dim in scores) {
      if (scores[dim] > maxScore) {
        maxScore = scores[dim];
        dominant = dim;
      }
    }

    state.dominant = dominant;
  }

  /* ---------- REFLEKSI ---------- */
  function renderReflection() {
    const box = document.getElementById("reflection");
    if (!box) return;

    const reflections = {
      fisik: `
        <p>🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Pelankan ritme dan beri tubuh ruang untuk bernapas.</p>
      `,
      pikiran: `
        <p>🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Tidak semua hal harus dipikirkan hari ini.</p>
      `,
      emosional: `
        <p>💛 Ada perasaan yang mungkin selama ini Anda tahan sendiri.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Akui dulu apa yang dirasakan.</p>
      `,
      sensorik: `
        <p>🌱 Indra Anda mungkin sudah terlalu lama sibuk.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Beri mata dan telinga jeda sejenak.</p>
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
        <p>🕯️ Ada kerinduan untuk menata ulang arah hidup.</p>
        <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Luangkan waktu hening sejenak.</p>
      `
    };

    box.innerHTML = `
      <p><strong>Area yang paling membutuhkan perhatian:</strong></p>
      ${reflections[state.dominant] || "<p>Terima kasih sudah merefleksikan diri hari ini.</p>"}
    `;
  }

  if (btnResult) {
    btnResult.addEventListener("click", () => {
      calculateResult();
      renderReflection();
      goTo(5);
    });
  }

});