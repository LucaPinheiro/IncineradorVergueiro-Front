import { updateCarousel } from "./banner/bannerSlide.js";
import { carouselData } from "./banner/data/carouselData.js";
import { createIndicators } from "./banner/indicators.js";

const menuButton = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
});

createIndicators();

updateCarousel(carouselData);
