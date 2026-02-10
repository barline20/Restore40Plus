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
  day5Ended: false,
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
      Mungkin bukan karena aktivitas yang terlalu berat,  
      melainkan karena hari-hari yang terus berjalan tanpa ruang untuk benar-benar berhenti.
      Tubuh punya caranya sendiri untuk memberi tahu ketika ia butuh perhatian.
    </p>
    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Coba pelankan ritme Anda sedikit hari ini.  
      Ambil jeda singkat, meski hanya beberapa menit,  
      dan dengarkan apa yang tubuh Anda butuhkan—tanpa memaksanya untuk terus kuat.
    </p>
  `,
  pikiran: `
    <p>🕊️ <strong>Pikiran Anda tampaknya jarang benar-benar berhenti.</strong></p>
    <p>
      Bahkan ketika tubuh diam, kepala masih dipenuhi oleh berbagai hal yang perlu dipikirkan.
      Ini bukan tanda bahwa Anda lemah,
      melainkan tanda bahwa pikiran sudah bekerja terlalu lama.
    </p>
    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Hari ini, tidak semua hal harus dipikirkan atau diselesaikan.  
      Beberapa boleh ditaruh dulu,  
      agar pikiran punya ruang untuk bernapas.
    </p>
  `,
  emosional: `
    <p>💛 <strong>Ada perasaan yang mungkin selama ini Anda simpan sendiri.</strong></p>
    <p>
      Bukan karena Anda tidak mau berbagi,
      tetapi karena sudah terbiasa menahan dan tetap berjalan.
      Perasaan yang terus dipendam juga bisa merasa lelah.
    </p>
    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Luangkan waktu untuk menyadari apa yang sedang Anda rasakan saat ini.  
      Tidak perlu diubah, dijelaskan, atau diperbaiki—  
      cukup diakui dengan jujur dan lembut.
    </p>
  `,
  sensorik: `
    <p>🌱 <strong>Indra Anda mungkin sudah terlalu lama berada dalam kondisi siaga.</strong></p>
    <p>
      Paparan layar, suara, dan aktivitas yang terus-menerus
      membuat tubuh sulit menemukan ketenangan yang utuh.
    </p>
    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Beri mata dan telinga sedikit jeda hari ini.  
      Cari suasana yang lebih lembut dan minim gangguan,  
      agar tubuh perlahan bisa merasa lebih aman.
    </p>
  `,
  relasi: `
    <p>🤍 <strong>Anda tampaknya banyak hadir untuk orang lain.</strong></p>
    <p>
      Sering kali, tanpa disadari,
      kebutuhan diri sendiri menjadi nomor sekian.
      Padahal, memberi juga membutuhkan ruang untuk diisi kembali.
    </p>
    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Dekatlah dengan orang yang membuat Anda merasa aman dan diterima.  
      Anda tidak perlu memberi apa pun atau memainkan peran tertentu—  
      hadir sebagai diri sendiri sudah cukup.
    </p>
  `,
  ekspresif: `
    <p>✨ <strong>Bagian diri Anda yang menikmati hal-hal sederhana sebenarnya masih ada.</strong></p>
    <p>
      Mungkin tertutup oleh kesibukan dan tuntutan,
      tetapi bukan berarti hilang.
      Ia hanya menunggu diberi ruang kembali.
    </p>
    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Lakukan satu hal kecil yang Anda sukai hari ini.  
      Tidak perlu target, hasil, atau alasan khusus—  
      cukup lakukan karena itu memberi rasa hidup.
    </p>
  `,
  spiritual: `
    <p>🕯️ <strong>Ada kerinduan untuk berhenti sejenak dan menata arah.</strong></p>
    <p>
      Keinginan ini sering muncul setelah perjalanan yang panjang dan melelahkan.
      Itu bukan tanda kebingungan,
      melainkan tanda bahwa diri Anda sedang mencari makna.
    </p>
    <p><strong>Nggak apa-apa, yuk mulai dari sini:</strong><br>
      Luangkan waktu hening yang singkat hari ini.  
      Bisa melalui doa, refleksi, atau sekadar diam—  
      biarkan keheningan membantu Anda kembali terhubung dengan diri sendiri.
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

    const header = document.createElement("h3");
    header.textContent = `Day ${dayNum} · ${day.title}`;
    card.appendChild(header);

    if (!locked) {
      header.style.cursor = "pointer";
      header.addEventListener("click", () => {
        state.currentOpenDay =
          state.currentOpenDay === dayNum ? null : dayNum;
        renderProgramDays();
      });
    }

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

      // DAY 5
      if (dayNum === 5) {
        if (!state.day5Ended) {
          content.innerHTML = `
            <p><strong>Aktivitas:</strong> ${day.activity}</p>
            <p>${day.guide}</p>
            <button id="endDay5" class="primary">
              Akhiri Sesi Restore40+
            </button>
          `;

          setTimeout(() => {
            document
              .getElementById("endDay5")
              .addEventListener("click", () => {
                state.day5Ended = true;
                renderProgramDays();
              });
          }, 0);

        } else {
          content.innerHTML = `
            <p class="soft">🤍 Terima kasih telah menyelesaikan sesi Restore40+.</p>
            <p><strong>Bagaimana perasaan Anda hari ini?</strong></p>

            <textarea id="day5Text" rows="4"
              placeholder="Tuliskan dengan jujur."
              style="width:100%; padding:12px; border-radius:12px;">
            </textarea>

            <button id="btnDay5Submit" class="primary">Lanjut</button>
          `;

          setTimeout(() => {
            const btnSubmit = document.getElementById("btnDay5Submit");
            const textArea = document.getElementById("day5Text");

            btnSubmit.addEventListener("click", () => {
              state.day5Reflection = textArea.value.trim();
              sendToGoogleSheets();
              goTo(8);
            });
          }, 0);
        }
      }

      card.appendChild(content);
    }

    if (locked) {
      const lockMsg = document.createElement("p");
      lockMsg.className = "soft";
      lockMsg.textContent = "🔒 Hari ini masih terkunci";
      card.appendChild(lockMsg);
    }

    container.appendChild(card);
  });
}
function sendToGoogleSheets() {
  // Pastikan URL ini adalah hasil Deployment TERBARU (yang ada ID AKfycbz...)
  const scriptURL = "https://script.google.com/macros/s/AKfycbzDhVzEo5Y5eJS30KMEgJhJ-j_GIMB6L0XAkBVjRQOEp3ZR0Swsyz5Wlpv2mVW5oETM/exec";

  const formData = new FormData();
  formData.append("name", state.name);
  formData.append("age", state.age);
  formData.append("role", state.role);
  formData.append("phone", state.phone);
  formData.append("dominant", state.dominant);
  formData.append("answers", JSON.stringify(state.answers));
  formData.append("day5Reflection", state.day5Reflection);

  console.log("Memulai pengiriman data...");

  fetch(scriptURL, {
    method: "POST",
    body: formData,
    mode: "no-cors" 
  })
  .then(() => {
    console.log("✅ Data terkirim (Status: Opaque)");
    // Pindah ke screen 8 setelah berhasil
    goTo(8);
  })
  .catch(err => {
    console.error("❌ Gagal kirim:", err);
    // Tetap pindah agar user tidak macet
    goTo(8);
  });
}