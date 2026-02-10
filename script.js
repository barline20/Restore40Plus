/* ======================================================
   GLOBAL STATE (TANPA AUTOSAVE SCREEN)
====================================================== */
const state = {
  name: "",
  age: "",
  role: "",
  phone: "",
  answers: {},
  dominant: null,
  currentDay: 1
};

/* ======================================================
   NAVIGASI SCREEN
====================================================== */
window.goTo = function (target) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );

  const next = document.getElementById(`screen-${target}`);
  if (next) next.classList.add("active");

  window.scrollTo(0, 0);
};

/* ======================================================
   KONVERSI SKOR
====================================================== */
const SCORE_MAP = {
  Ya: 3,
  Terkadang: 2,
  Tidak: 1
};

/* ======================================================
   INIT
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  goTo(1);

  /* ---------- SCREEN 2 : PROFIL ---------- */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  function checkProfile() {
    btnNextProfile.disabled =
      !nameInput.value.trim() || !ageInput.value.trim();
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

  customRole.addEventListener("input", () => {
    state.role = customRole.value.trim();
    btnStart.disabled = !state.role;
  });

  btnStart.addEventListener("click", () => goTo(4));

  /* ---------- SCREEN 4 : PERTANYAAN ---------- */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");

  function checkAnswered() {
    btnResult.disabled =
      Object.keys(state.answers).length !== questions.length;
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
        opts.querySelectorAll(".answer")
          .forEach(a => a.classList.remove("selected"));
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

  /* ---------- SCREEN 6 : NOMOR HP ---------- */
  const phoneInput = document.getElementById("phone");
  const btnSubmitPhone = document.getElementById("btnSubmitPhone");

  btnSubmitPhone.addEventListener("click", () => {
    if (!phoneInput.value.trim()) {
      alert("Silakan masukkan nomor HP Anda 🤍");
      return;
    }

    state.phone = phoneInput.value.trim();
    state.currentDay = 1;

    // safety fallback
    if (!state.dominant) state.dominant = "pikiran";

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
   REFLEKSI (FULL EMPATIK)
====================================================== */
function renderReflection() {
  const box = document.getElementById("reflection");

  const reflections = {
    fisik: `
      <p><strong>Sepertinya kamu lagi…</strong></p>
      <p>🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.</p>
      <p>Mungkin bukan karena aktivitas berat, tapi karena terus berjalan tanpa benar-benar berhenti.</p>
      <p>Wajar kalau tubuh kini terasa meminta perhatian.</p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>Kita pelankan ritme sedikit saja. Ambil jeda singkat di sela hari, dan dengarkan tubuh tanpa memaksanya terus kuat.</p>
    `,
    pikiran: `
      <p>🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.</p>
      <p>Bahkan saat diam, kepala masih penuh dengan banyak hal.</p>
      <p>Ini bukan tanda lemah—ini tanda lelah.</p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>Hari ini, tidak semua hal harus dipikirkan. Sebagian boleh ditaruh dulu, dan itu tidak apa-apa.</p>
    `,
    emosional: `
      <p>💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.</p>
      <p>Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.</p>
      <p>Hati juga bisa capek.</p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>Perhatikan dulu apa yang sedang Anda rasakan. Tidak perlu diubah atau dijelaskan—cukup diakui.</p>
    `,
    sensorik: `
      <p>🌱 Indra Anda mungkin sudah terlalu lama sibuk.</p>
      <p>Layar, suara, dan aktivitas terus-menerus bisa membuat tubuh sulit benar-benar tenang.</p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>Kita beri mata dan telinga sedikit jeda. Matikan layar sebentar dan cari suasana yang lebih lembut.</p>
    `,
    relasi: `
      <p>🤍 Anda banyak hadir untuk orang lain.</p>
      <p>Kadang tanpa sadar, diri sendiri jadi belakangan.</p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>Dekatlah dengan orang yang membuat Anda merasa aman. Tidak perlu memberi apa-apa—cukup hadir.</p>
    `,
    ekspresif: `
      <p>✨ Bagian diri Anda yang menikmati hal-hal sederhana masih ada.</p>
      <p>Mungkin tertutup oleh kesibukan, bukan hilang.</p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>Lakukan satu hal kecil yang Anda suka hari ini. Tanpa target, tanpa harus berguna.</p>
    `,
    spiritual: `
      <p>🕯️ Ada keinginan untuk berhenti sejenak dan menata arah.</p>
      <p>Itu wajar setelah perjalanan yang panjang.</p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>Luangkan waktu hening yang singkat. Boleh dalam doa, refleksi, atau diam saja—apa adanya.</p>
    `
  };

  box.innerHTML = reflections[state.dominant];
}

/* ======================================================
   PROGRAM 5 HARI
====================================================== */
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
      <h3>Day ${dayNum} · ${day.title}</h3>
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
