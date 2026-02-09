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

