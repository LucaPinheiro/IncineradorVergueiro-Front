import { updateCarousel } from "./banner/bannerSlide.js";
import { carouselData } from "./banner/data/carouselData.js";
import { createIndicators } from "./banner/indicators.js";

createIndicators();

updateCarousel(carouselData);
