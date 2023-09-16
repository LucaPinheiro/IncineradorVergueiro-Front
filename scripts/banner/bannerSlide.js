import { carouselData } from './carouselData.js';

let currentIndex = 0;

function updateCarousel() {
  const titleElement = document.getElementById("carouselTitle");
  const textElement = document.getElementById("carouselText");
  const currentItem = carouselData[currentIndex];
  titleElement.textContent = currentItem.title;
  textElement.textContent = currentItem.text;

  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });

  currentIndex = (currentIndex + 1) % carouselData.length;
}

const interval = 3200;
setInterval(updateCarousel, interval);

export { updateCarousel }; 
