/* ======================================================
   GLOBAL STATE
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
   SCORE MAP
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

  /* ---------- SCREEN 2 ---------- */
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

  /* ---------- SCREEN 4 ---------- */
  const questionBox = document.getElementById("questions");
  const btnResult = document.getElementById("btnResult");

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
        opts.querySelectorAll(".answer").forEach(a =>
          a.classList.remove("selected")
        );
        o.classList.add("selected");
        state.answers[q.id] = label;

        btnResult.disabled =
          Object.keys(state.answers).length !== questions.length;
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

  /* ---------- SCREEN 6 ---------- */
  const phoneInput = document.getElementById("phone");
  const btnSubmitPhone = document.getElementById("btnSubmitPhone");

  btnSubmitPhone.addEventListener("click", () => {
    if (!phoneInput.value.trim()) {
      alert("Silakan masukkan nomor HP Anda 🤍");
      return;
    }

    state.phone = phoneInput.value.trim();
    state.currentDay = 1;

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
   REFLEKSI
====================================================== */
function renderReflection() {
  const box = document.getElementById("reflection");

  const reflections = {
    fisik: `
      <p><strong>Sepertinya kamu lagi sangat lelah secara fisik.</strong></p>
      <p>
        🌿 Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.
        Mungkin bukan karena aktivitas berat, tapi karena terus berjalan tanpa benar-benar berhenti.
        Wajar kalau tubuh kini terasa meminta perhatian.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>
        Kita pelankan ritme sedikit saja.
        Ambil jeda singkat di sela hari, dan dengarkan tubuh tanpa memaksanya terus kuat.
      </p>
    `,
    pikiran: `
      <p><strong>Sepertinya yang paling lelah adalah pikiran Anda.</strong></p>
      <p>
        🕊️ Pikiran Anda tampaknya jarang benar-benar berhenti.
        Bahkan saat diam, kepala masih penuh dengan banyak hal.
        Ini bukan tanda lemah—ini tanda lelah.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>
        Hari ini, tidak semua hal harus dipikirkan.
        Sebagian boleh ditaruh dulu, dan itu tidak apa-apa.
      </p>
    `,
    emosional: `
      <p><strong>Sepertinya hati Anda sedang cukup lelah.</strong></p>
      <p>
        💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.
        Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.
        Hati juga bisa capek.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>
        Perhatikan dulu apa yang sedang Anda rasakan.
        Tidak perlu diubah atau dijelaskan—cukup diakui.
      </p>
    `,
    sensorik: `
      <p><strong>Indra Anda tampaknya butuh istirahat.</strong></p>
      <p>
        🌱 Indra Anda mungkin sudah terlalu lama sibuk.
        Layar, suara, dan aktivitas terus-menerus bisa membuat tubuh sulit benar-benar tenang.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>
        Kita beri mata dan telinga sedikit jeda.
        Matikan layar sebentar dan cari suasana yang lebih lembut.
      </p>
    `,
    relasi: `
      <p><strong>Relasi tampaknya cukup menguras Anda akhir-akhir ini.</strong></p>
      <p>
        🤍 Anda banyak hadir untuk orang lain.
        Kadang tanpa sadar, diri sendiri jadi belakangan.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>
        Dekatlah dengan orang yang membuat Anda merasa aman.
        Tidak perlu memberi apa-apa—cukup hadir.
      </p>
    `,
    ekspresif: `
      <p><strong>Ada bagian diri Anda yang ingin kembali bernapas.</strong></p>
      <p>
        ✨ Bagian diri Anda yang menikmati hal-hal sederhana masih ada.
        Mungkin tertutup oleh kesibukan, bukan hilang.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>
        Lakukan satu hal kecil yang Anda suka hari ini.
        Tanpa target, tanpa harus berguna.
      </p>
    `,
    spiritual: `
      <p><strong>Sepertinya Anda sedang mencari arah yang lebih hening.</strong></p>
      <p>
        🕯️ Ada keinginan untuk berhenti sejenak dan menata arah.
        Itu wajar setelah perjalanan yang panjang.
      </p>
      <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong></p>
      <p>
        Luangkan waktu hening yang singkat.
        Boleh dalam doa, refleksi, atau diam saja—apa adanya.
      </p>
    `
  };

  box.innerHTML = reflections[state.dominant];
}

  box.innerHTML = `
    <p>
      Area yang paling membutuhkan ruang saat ini adalah:
      <strong>${titles[state.dominant]}</strong>.
    </p>
  `;

/* ======================================================
   PROGRAM 5 HARI
====================================================== */
const programs = {
  pikiran: [
    { title: "Mengosongkan Kepala", activity: "Menulis bebas", guide: "Tuliskan apa pun tanpa disaring." },
    { title: "Diam yang Aman", activity: "Duduk diam", guide: "Bernapas pelan 5–10 menit." },
    { title: "Membaca Ringan", activity: "Membaca reflektif", guide: "Baca tanpa target." },
    { title: "Melepaskan Beban", activity: "Menulis beban pikiran", guide: "Letakkan beban di kertas." },
    { title: "Menyederhanakan", activity: "Satu fokus hari ini", guide: "Pilih satu hal kecil." }
  ]
};

/* ======================================================
   RENDER DAY 1–5
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
          ? `<p class="soft">🔒 Terkunci</p>`
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
