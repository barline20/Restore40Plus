/* ======================================================
   GLOBAL STATE
====================================================== */
const state = {
  name: "",
  age: "",
  role: "",
  answers: {},
  dominant: "",
  progressDay: 1
};

/* ======================================================
   SCREEN NAVIGATION
====================================================== */
function goTo(target) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => screen.classList.remove("active"));

  const nextScreen = document.getElementById(`screen-${target}`);

  if (!nextScreen) {
    console.error("Screen tidak ditemukan:", target);
    return;
  }

  nextScreen.classList.add("active");
  window.scrollTo(0, 0);
}

/* ======================================================
   INIT + LOGIC
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  /* === SCREEN 1 === */
  goTo(1);

  /* ===== SCREEN 2 : NAMA & USIA ===== */
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const btnNextProfile = document.getElementById("btnNextProfile");

  function checkProfileFilled() {
    const nameFilled = nameInput.value.trim() !== "";
    const ageFilled = ageInput.value.trim() !== "";
    btnNextProfile.disabled = !(nameFilled && ageFilled);
  }

  nameInput.addEventListener("input", checkProfileFilled);
  ageInput.addEventListener("input", checkProfileFilled);

  btnNextProfile.addEventListener("click", () => {
    state.name = nameInput.value.trim();
    state.age = ageInput.value.trim();
    goTo(3);
  });

  /* ===== SCREEN 3 : PERAN HIDUP ===== */
  const roleOptions = document.querySelectorAll("#screen-3 .option");
  const customRoleInput = document.getElementById("customRole");
  const btnStart = document.getElementById("btnStart");

  customRoleInput.style.display = "none";
  let selectedRole = "";

  roleOptions.forEach(option => {
    option.addEventListener("click", () => {
      roleOptions.forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");

      selectedRole = option.textContent.trim();

      if (selectedRole === "Lainnya") {
        customRoleInput.style.display = "block";
        customRoleInput.value = "";
        btnStart.disabled = true;
      } else {
        customRoleInput.style.display = "none";
        state.role = selectedRole;
        btnStart.disabled = false;
      }
    });
  });

  customRoleInput.addEventListener("input", () => {
    if (customRoleInput.value.trim() !== "") {
      state.role = customRoleInput.value.trim();
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
    }
  });

  btnStart.addEventListener("click", () => {
    goTo(4);
  });

  /* ======================================================
     SCREEN 4 : RENDER PERTANYAAN (DIMATIKAN SEMENTARA)
     Supaya Screen 1 & 2 hidup dulu
  ====================================================== */

  /*
  const questionBox = document.getElementById("questions");
  const btnResult = document.querySelector("#screen-4 button");

  btnResult.disabled = true;

  questions.forEach(q => {
    const card = document.createElement("div");
    card.className = "question-card";

    const questionText = document.createElement("strong");
    questionText.textContent = q.text;

    const answers = document.createElement("div");

    const options = [
      { label: "Ya", value: 3 },
      { label: "Terkadang", value: 2 },
      { label: "Tidak", value: 1 }
    ];

    options.forEach(opt => {
      const btn = document.createElement("div");
      btn.className = "answer";
      btn.textContent = opt.label;

      btn.addEventListener("click", () => {
        answers.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
        btn.classList.add("selected");

        state.answers[q.id] = {
          value: opt.value,
          dimension: q.dimension
        };
      });

      answers.appendChild(btn);
    });

    card.appendChild(questionText);
    card.appendChild(answers);
    questionBox.appendChild(card);
  });
  */

});
