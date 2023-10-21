import { openConfirmationModal } from "./modalRemove/modalUtils.js";

const eventCardsContainer = document.getElementById("eventCards");

fetch("http://localhost:3000/events")
  .then((response) => response.json())
  .then((eventsData) => {
    eventsData.forEach((event) => {
      const card = document.createElement("div");
      card.className = "card";
      card.id = `event-${event._id}`;

      const cardBox = document.createElement("div");
      cardBox.className = "card_box";

      const namePara = document.createElement("p");
      namePara.className = "text";
      namePara.textContent = `Nome do Evento: ${event.nameEvent}`;
      cardBox.appendChild(namePara);

      const eventDate = new Date(event.date);
      const formattedDate = `${eventDate.getDate()}/${
        eventDate.getMonth() + 1
      }`;
      const datePara = document.createElement("p");
      datePara.className = "text";
      datePara.textContent = `Data: ${formattedDate}`;
      cardBox.appendChild(datePara);

      const descPara = document.createElement("p");
      descPara.className = "text";
      descPara.textContent = `Descrição: ${event.description}`;
      cardBox.appendChild(descPara);

      const idPara = document.createElement("p");
      idPara.className = "text";
      idPara.textContent = `ID Evento: ${event._id}`;
      cardBox.appendChild(idPara);

      const buttons = document.createElement("div");
      buttons.className = "buttons";

      const deleteButton = document.createElement("button");
      deleteButton.className = "button";
      deleteButton.textContent = "Apagar";
      deleteButton.addEventListener("click", () => {
        openConfirmationModal(event._id);
      });
      buttons.appendChild(deleteButton);

      const editButton = document.createElement("button");
      editButton.className = "button";

      card.appendChild(cardBox);
      card.appendChild(buttons);

      eventCardsContainer.appendChild(card);
    });
  });
