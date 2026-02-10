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
      goTo(5); // placeholder hasil
    });
  }

});