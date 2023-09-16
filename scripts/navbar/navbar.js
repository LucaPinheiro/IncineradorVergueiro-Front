document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const menuBtn2 = document.getElementById("menuBtn2");
  const nav = document.getElementById("nav");
  const nav2 = document.getElementById("nav2");

  menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
      nav2.classList.remove("show"); 
  });

  menuBtn2.addEventListener("click", () => {
      nav2.classList.toggle("show");
      nav.classList.remove("show"); 
  });
});