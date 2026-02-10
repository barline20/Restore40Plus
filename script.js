/* ===============================
   GLOBAL STATE
=============================== */
const state = {
  name: "",
  age: "",
  role: ""
};

/* ===============================
   NAVIGASI SCREEN
=============================== */
function goTo(target) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
  });

  const next = document.getElementById(`screen-${target}`);
  if (next) {
    next.classList.add("active");
    window.scrollTo(0, 0);
  }
}

/* ===============================
   INIT
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  // SCREEN 1
  goTo(1);

  const btnConsent = document.getElementById("btnConsent");
  if (btnConsent) {
    btnConsent.addEventListener("click", () => {
      goTo(2);
    });
  }

  // SCREEN 2
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNext = document.getElementById("btnNextProfile");

  function checkProfile() {
    if (!btnNext) return;
    btnNext.disabled = !(nameInput.value.trim() && ageInput.value.trim());
  }

  if (nameInput && ageInput) {
    nameInput.addEventListener("input", checkProfile);
    ageInput.addEventListener("input", checkProfile);
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      state.name = nameInput.value.trim();
      state.age = ageInput.value.trim();
      goTo(3);
    });
  }

  // SCREEN 3
  const options = document.querySelectorAll("#screen-3 .option");
  const customRole = document.getElementById("customRole");
  const btnStart = document.getElementById("btnStart");

  if (customRole) customRole.style.display = "none";
  if (btnStart) btnStart.disabled = true;

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      options.querySelectorAll(".answer")
       .forEach(a => a.classList.remove("selected"));
      opt.classList.add("selected");
      
      // simpan jawaban
      state.answers[q.id] = opt.textContent;
      
      // cek apakah semua sudah dijawab
      checkAllAnswered();
});

      if (opt.textContent.trim() === "Lainnya") {
        if (customRole) {
          customRole.style.display = "block";
          btnStart.disabled = true;
        }
      } else {
        if (customRole) customRole.style.display = "none";
        state.role = opt.textContent.trim();
        btnStart.disabled = false;
      }
    });
  });

  if (customRole) {
    customRole.addEventListener("input", () => {
      btnStart.disabled = !customRole.value.trim();
      state.role = customRole.value.trim();
    });
  }

  if (btnStart) {
    btnStart.addEventListener("click", () => {
      goTo(4);
    });
  }

; 
/* ===============================
   KUNCI PERTANYAAN (SCREEN 4)
=============================== */
const btnResult = document.getElementById("btnResult");

// pastikan tombol mati di awal
if (btnResult) btnResult.disabled = true;

// fungsi cek apakah semua pertanyaan sudah dijawab
function checkAllAnswered() {
  if (!btnResult) return;

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(state.answers).length;

  btnResult.disabled = answeredCount !== totalQuestions;
}
if (btnResult) {
  btnResult.addEventListener("click", () => {
    goTo(5); // sementara ke screen hasil / placeholder
  });
}