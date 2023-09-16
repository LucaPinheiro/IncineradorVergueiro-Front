const carouselData = [
  {
    title: "Eventos",
    text: "INCINERADOR VERGUEIRO ESTÁ DE PORTAS ABERTAS! NOS PRÓXIMOS SÁBADOS DO MÊS DE SETEMBRO ESTARÁ ABERTA AS INSCRIÇÕES PARA O EVENTO.",
    buttonText: "Inscreva-se",
    buttonLink: "#",
  },
  {
    title: "Abaixo Assinado",
    text: "Contribua",
    buttonText: "Acesse",
    buttonLink: "#",
  },
  {
    title: "Evento 3",
    text: "Descrição do Evento 3.",
    buttonText: "Inscreva-se 3",
    buttonLink: "#",
  },
];

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

const interval = 4000;
setInterval(updateCarousel, interval);

updateCarousel();