const eventCardsContainer = document.getElementById("eventCards");
const confirmationModal = document.getElementById("confirmationModal");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");

function openConfirmationModal(eventId) {
  confirmDeleteButton.dataset.eventId = eventId;

  confirmationModal.style.display = "block";
}

function closeConfirmationModal() {
  confirmationModal.style.display = "none";
}

cancelDeleteButton.addEventListener("click", closeConfirmationModal);

confirmDeleteButton.addEventListener("click", () => {
  const eventId = confirmDeleteButton.dataset.eventId;


  fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        const eventCard = document.getElementById(`event-${eventId}`);
        eventCard.style.transition = "opacity 0.3s";
        eventCard.style.opacity = 0;

        closeConfirmationModal();
      } else {
        console.error("Erro ao excluir o evento");
        closeConfirmationModal();
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir o evento:", error);
      closeConfirmationModal();
    });
});

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
      datePara.textContent = `Data do evento: ${formattedDate}`;
      cardBox.appendChild(datePara);

      const durationPara = document.createElement("p");
      durationPara.className = "text";
      durationPara.textContent = `Duração do evento: ${event.startTime} às ${event.endTime}`;
      cardBox.appendChild(durationPara);

      const descPara = document.createElement("p");
      descPara.className = "text";
      descPara.textContent = `Descrição do evento: ${event.description}`;
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
