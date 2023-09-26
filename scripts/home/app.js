import { updateCarousel } from "./banner/bannerSlide.js";
import { carouselData } from "./banner/data/carouselData.js";
import { createIndicators } from "./banner/indicators.js";
import { toggleNavVisibility } from "./navbar/menuToggle.js"; 

const menuButton = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

toggleNavVisibility(menuButton, nav);

createIndicators();

updateCarousel(carouselData);
