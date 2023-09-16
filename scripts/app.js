import { updateCarousel } from "./banner/bannerSlide.js";

const menuButton = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
});

updateCarousel();
