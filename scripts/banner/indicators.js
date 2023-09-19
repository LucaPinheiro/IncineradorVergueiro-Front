import { carouselData } from './data/carouselData.js';

function createIndicators() {
  const indicatorsContainer = document.getElementById("indicators");

  carouselData.forEach((_, index) => {
    const indicator = document.createElement("span");
    indicator.className = "indicator";
    indicator.id = `indicator${index}`;
    indicatorsContainer.appendChild(indicator);
  });
}

export { createIndicators };