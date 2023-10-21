async function getEventsFromAPI() {
  try {
    const response = await fetch("http://localhost:3000/events");
    if (!response.ok) {
      throw new Error("Erro ao obter eventos da API");
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const eventsContainer = document.getElementById("events");
  const events = await getEventsFromAPI();

  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    const eventCardTitle = document.createElement("div");
    eventCardTitle.classList.add("event-card-title");
    const title = document.createElement("h2");
    title.textContent = `- ${event.nameEvent}`;
    eventCardTitle.appendChild(title);

    const date = new Date(event.date);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });

    const dateTitle = document.createElement("h2");
    dateTitle.textContent = `Data: ${formattedDate}`;

    const description = document.createElement("p");
    description.textContent = `Descrição: ${event.description}`;

    const eventTime = document.createElement("p");
    eventTime.textContent = `Duração do Evento: ${event.startTime} às ${event.endTime}`;

    const inscreverButton = document.createElement("button");
    inscreverButton.classList.add("card-button");
    inscreverButton.textContent = "Inscrever-se";

    eventCard.appendChild(eventCardTitle);
    eventCard.appendChild(dateTitle);
    eventCard.appendChild(eventTime);
    eventCard.appendChild(description);
    eventCard.appendChild(inscreverButton);

    eventsContainer.appendChild(eventCard);
  });
});
