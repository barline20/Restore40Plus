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
  currentDay: 1,
  currentOpenDay: null,
  day5Reflection: ""
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
  const reflectionBox = document.getElementById("reflection");
  if (!reflectionBox) return;

  const content = {
    fisik: `
      <p>🌿 <strong>Sepertinya tubuh Anda sudah bekerja cukup lama tanpa banyak jeda.</strong></p>
      <p>
        Mungkin bukan karena aktivitas berat, tapi karena terus berjalan tanpa benar-benar berhenti.
        Wajar jika tubuh kini meminta perhatian.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Pelankan ritme sedikit. Ambil jeda singkat, dan dengarkan tubuh tanpa memaksanya terus kuat.
      </p>
    `,
    pikiran: `
      <p>🕊️ <strong>Pikiran Anda tampaknya jarang benar-benar berhenti.</strong></p>
      <p>
        Bahkan saat diam, kepala masih penuh oleh banyak hal.
        Ini bukan tanda lemah—ini tanda lelah.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Hari ini, tidak semua hal harus dipikirkan. Sebagian boleh ditaruh dulu.
      </p>
    `,
    emosional: `
      <p>💛 <strong>Ada perasaan yang mungkin selama ini Anda simpan sendiri.</strong></p>
      <p>
        Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.
        Hati juga bisa capek.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Perhatikan dulu apa yang Anda rasakan. Tidak perlu diubah—cukup diakui.
      </p>
    `,
    sensorik: `
      <p>🌱 <strong>Indra Anda mungkin sudah terlalu lama sibuk.</strong></p>
      <p>
        Layar, suara, dan aktivitas terus-menerus membuat tubuh sulit benar-benar tenang.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Beri mata dan telinga sedikit jeda. Cari suasana yang lebih lembut.
      </p>
    `,
    relasi: `
      <p>🤍 <strong>Anda banyak hadir untuk orang lain.</strong></p>
      <p>
        Kadang tanpa sadar, diri sendiri jadi belakangan.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Dekatlah dengan orang yang membuat Anda merasa aman. Tidak perlu memberi apa-apa.
      </p>
    `,
    ekspresif: `
      <p>✨ <strong>Bagian diri Anda yang menikmati hal-hal sederhana masih ada.</strong></p>
      <p>
        Mungkin tertutup oleh kesibukan—bukan hilang.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Lakukan satu hal kecil yang Anda suka hari ini. Tanpa target.
      </p>
    `,
    spiritual: `
      <p>🕯️ <strong>Ada keinginan untuk berhenti sejenak dan menata arah.</strong></p>
      <p>
        Itu wajar setelah perjalanan yang panjang.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
        Luangkan waktu hening yang singkat—doa, refleksi, atau diam saja.
      </p>
    `
  };

  reflectionBox.innerHTML = content[state.dominant] || `
    <p>Terima kasih telah berbagi dengan jujur.</p>
  `;
}

/* ======================================================
   PROGRAM 5 HARI
====================================================== */
function renderProgramDays() {
  const container = document.getElementById("programDays");
  container.innerHTML = "";

  const selectedProgram = programs[state.dominant];
  if (!selectedProgram) return;
  
  selectedProgram.forEach((day, i) => {
  const dayNum = i + 1;
  const locked = dayNum > state.currentDay;
  const isOpen = state.currentOpenDay === dayNum;

  const card = document.createElement("div");
  card.className = "day-card" + (locked ? " locked" : "");

  // HEADER DAY (SELALU TERLIHAT)
  const header = document.createElement("h3");
  header.textContent = `Day ${dayNum} · ${day.title}`;
  card.appendChild(header);

  // KLIK DAY
  if (!locked) {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      state.currentOpenDay =
        state.currentOpenDay === dayNum ? null : dayNum;
      renderProgramDays();
    });
  }
  // ISI AKTIVITAS (HANYA JIKA OPEN)
if (isOpen && !locked) {
  const content = document.createElement("div");

  // DAY 1–4
  if (dayNum < 5) {
    content.innerHTML = `
      <p><strong>Aktivitas:</strong> ${day.activity}</p>
      <p>${day.guide}</p>
    `;

    const btn = document.createElement("button");
    btn.className = "primary";
    btn.textContent = "Saya sudah melakukan ini";

    btn.addEventListener("click", () => {
      state.currentDay++;
      state.currentOpenDay = null;
      renderProgramDays();
    });

    content.appendChild(btn);
  }

  // DAY 5 — REFLEKSI PENUTUP
  if (dayNum === 5) {
    content.innerHTML = `
      <p class="soft">
        🤍 Terima kasih telah berjalan bersama saya.<br>
        Menjalani lima hari ini bukan hal yang ringan.
        Setiap langkah kecil yang Anda ambil adalah bentuk kepedulian
        pada diri sendiri.
      </p>

      <p>
        Sebelum kita melangkah lebih jauh,
        saya ingin mendengar dari Anda.
      </p>

      <p><strong>
        Bagaimana perasaan Anda setelah menjalani perjalanan 5 hari ini?
      </strong></p>

      <textarea id="day5Text" rows="4"
        placeholder="Silakan tuliskan dengan jujur, tidak ada jawaban benar atau salah."
        style="width:100%; padding:12px; border-radius:12px; border:1px solid #d0d8d0;">
      </textarea>

      <button id="btnDay5Submit" class="primary">
        Lanjut
      </button>
    `;

    // HANDLE SUBMIT DAY 5
    setTimeout(() => {
      const btnSubmit = document.getElementById("btnDay5Submit");
      const textArea = document.getElementById("day5Text");

      btnSubmit.addEventListener("click", () => {
        state.day5Reflection = textArea.value.trim();
        goTo(8); // Screen Kado
      });
    }, 0);
  }

  card.appendChild(content);
}
  // LOCKED MESSAGE
  if (locked) {
    const lockMsg = document.createElement("p");
    lockMsg.className = "soft";
    lockMsg.textContent = "🔒 Hari ini masih terkunci";
    card.appendChild(lockMsg);
  }

  container.appendChild(card);
});
    if (!locked && dayNum < 5) {
      card.querySelector("button").addEventListener("click", () => {
        state.currentDay++;
        renderProgramDays();
      });
    }

    container.appendChild(card);
  };
