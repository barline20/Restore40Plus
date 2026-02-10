/* ===============================
   GLOBAL STATE
=============================== */
const state = {
  name: "",
  age: "",
  role: "",
  answers: {}
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
   INIT
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- SCREEN 1 ---------- */
  goTo(1);

  const btnConsent = document.getElementById("btnConsent");
  if (btnConsent) {
    btnConsent.addEventListener("click", () => {
      goTo(2);
    });
  }

  /* ---------- SCREEN 2 ---------- */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  function checkProfileFilled() {
    if (!btnNextProfile) return;
    btnNextProfile.disabled = !(
      nameInput.value.trim() &&
      ageInput.value.trim()
    );
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
  const SCORE_MAP = {
  "Ya": 3,
  "Terkadang": 2,
  "Tidak": 1
};
  /* ---------- SCREEN 3 : PERAN ---------- */
const roleOptions = document.querySelectorAll("#screen-3 .option");
const customRole = document.getElementById("customRole");
const btnStart = document.getElementById("btnStart");

if (customRole) customRole.style.display = "none";
if (btnStart) btnStart.disabled = true;

roleOptions.forEach(opt => {
  opt.addEventListener("click", () => {
    // reset pilihan
    roleOptions.forEach(o => o.classList.remove("selected"));
    opt.classList.add("selected");

    const value = opt.textContent.trim();

    if (value === "Lainnya") {
      // tampilkan input hanya jika Lainnya
      customRole.style.display = "block";
      customRole.value = "";
      btnStart.disabled = true;
    } else {
      // sembunyikan input
      customRole.style.display = "none";
      state.role = value;
      btnStart.disabled = false;
    }
  });
});

// input manual utk "Lainnya"
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

// lanjut ke pertanyaan
if (btnStart) {
  btnStart.addEventListener("click", () => {
    goTo(4);
  });
}

  /* ---------- SCREEN 4 : RENDER PERTANYAAN ---------- */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");

  if (btnResult) btnResult.disabled = true;

  function checkAllAnswered() {
    if (!btnResult) return;
    btnResult.disabled =
      Object.keys(state.answers).length !== questions.length;
  }

  if (questionBox && typeof questions !== "undefined") {
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

  if (btnResult) {
  btnResult.addEventListener("click", () => {
    calculateResult();
    goTo(5);
    renderReflection();
  });
}
  function calculateResult() {
  const scores = {};

  questions.forEach(q => {
    const answerText = state.answers[q.id];
    const value = SCORE_MAP[answerText] || 0;

    if (!scores[q.dimension]) {
      scores[q.dimension] = 0;
    }
    scores[q.dimension] += value;
  });

  // cari dimensi dengan skor tertinggi
  let dominant = null;
  let maxScore = -1;

  Object.entries(scores).forEach(([dim, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominant = dim;
    }
  });

  state.dominant = dominant;
  return { scores, dominant };
}
function renderReflection() {
  const box = document.getElementById("reflection");
  if (!box) return;

  const reflections = {
  fisik: `
    <p>🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.<br>
    Mungkin bukan karena aktivitas berat, tapi karena terus berjalan tanpa benar-benar berhenti.<br>
    Wajar kalau tubuh kini terasa meminta perhatian.</p>

    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
    Kita pelankan ritme sedikit saja.<br>
    Ambil jeda singkat di sela hari, dan dengarkan tubuh tanpa memaksanya terus kuat.</p>
  `,

  pikiran: `
    <p>🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.<br>
    Bahkan saat diam, kepala masih penuh dengan banyak hal.<br>
    Ini bukan tanda lemah—ini tanda lelah.</p>

    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
    Hari ini, tidak semua hal harus dipikirkan.<br>
    Sebagian boleh ditaruh dulu, dan itu tidak apa-apa.</p>
  `,

  emosional: `
    <p>💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.<br>
    Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.<br>
    Hati juga bisa capek.</p>

    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
    Perhatikan dulu apa yang sedang Anda rasakan.<br>
    Tidak perlu diubah atau dijelaskan—cukup diakui.</p>
  `,

  sensorik: `
    <p>🌱 Indra Anda mungkin sudah terlalu lama sibuk.<br>
    Layar, suara, dan aktivitas terus-menerus bisa membuat tubuh sulit benar-benar tenang.</p>

    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
    Kita beri mata dan telinga sedikit jeda.<br>
    Matikan layar sebentar dan cari suasana yang lebih lembut.</p>
  `,

  relasi: `
    <p>🤍 Anda banyak hadir untuk orang lain.<br>
    Kadang tanpa sadar, diri sendiri jadi belakangan.</p>

    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
    Dekatlah dengan orang yang membuat Anda merasa aman.<br>
    Tidak perlu memberi apa-apa—cukup hadir.</p>
  `,

  ekspresif: `
    <p>✨ Bagian diri Anda yang menikmati hal-hal sederhana masih ada.<br>
    Mungkin tertutup oleh kesibukan, bukan hilang.</p>

    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
    Lakukan satu hal kecil yang Anda suka hari ini.<br>
    Tanpa target, tanpa harus berguna.</p>
  `,

  spiritual: `
    <p>🕯️ Ada keinginan untuk berhenti sejenak dan menata arah.<br>
    Itu wajar setelah perjalanan yang panjang.</p>

    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
    Luangkan waktu hening yang singkat.<br>
    Boleh dalam doa, refleksi, atau diam saja—apa adanya.</p>
  `
};

  const text = reflections[state.dominant] || 
    "Terima kasih telah jujur pada diri sendiri hari ini.";

  box.innerHTML = `
    <p><strong>Area utama yang menonjol:</strong> ${state.dominant}</p>
    <p>${text}</p>
  `;
}
});