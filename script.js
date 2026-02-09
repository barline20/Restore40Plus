/* ======================================================
   GLOBAL STATE (BELUM DIPAKAI PENUH)
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
  // sembunyikan semua screen
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  // tampilkan screen tujuan
  const nextScreen = document.getElementById(
    typeof target === "number"
      ? `screen-${target}`
      : `screen-${target}`
  );

  if (!nextScreen) {
    console.error("Screen tidak ditemukan:", target);
    return;
  }

  nextScreen.classList.add("active");

  // scroll ke atas setiap ganti screen
  window.scrollTo(0, 0);
}

/* ======================================================
   INIT (SAAT HALAMAN DIBUKA)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // pastikan hanya screen 1 aktif saat load
  goTo(1);
});

/* ======================================================
   SCREEN 2 : NAMA & USIA
====================================================== */
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

/* ======================================================
   SCREEN 3 : PERAN HIDUP
====================================================== */
const roleOptions = document.querySelectorAll("#screen-3 .option");
const customRoleInput = document.getElementById("customRole");
const btnStart = document.getElementById("btnStart");

let selectedRole = "";

roleOptions.forEach(option => {
  option.addEventListener("click", () => {
    // reset semua opsi
    roleOptions.forEach(o => o.classList.remove("selected"));

    // tandai yang dipilih
    option.classList.add("selected");
    selectedRole = option.textContent;

    // jika "Lainnya"
    if (selectedRole === "Lainnya") {
      customRoleInput.style.display = "block";
      customRoleInput.focus();
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
