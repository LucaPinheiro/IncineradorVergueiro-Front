document.addEventListener("DOMContentLoaded", () => {
  const suggestionEventsContainer =
    document.getElementById("suggestion-events");
  const overlay = document.querySelector(".overlay");

  const loadSuggestionEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/suggestion-events");
      if (!response.ok) {
        throw new Error("Erro ao buscar eventos sugeridos.");
      }

      const suggestionEvents = await response.json();

      suggestionEvents.forEach((event, index) => {
        const eventSection = document.createElement("section");
        eventSection.classList.add("container__section");
        eventSection.setAttribute("data-eventid", event._id);

        const eventElement = document.createElement("div");
        eventElement.classList.add("container__first-box-texts");

        const eventName = document.createElement("p");
        eventName.textContent = `Nome do Evento: ${event.nameEvent}`;

        const hostName = document.createElement("p");
        hostName.textContent = `Nome do Anfitrião: ${event.host}`;

        const eventDate = document.createElement("p");
        const eventDateObj = new Date(event.date);
        eventDate.textContent = `Data: ${eventDateObj.getUTCDate()}/${
          eventDateObj.getUTCMonth() + 1
        }`;

        const participants = document.createElement("p");
        participants.textContent = `Numero de Participantes: ${event.participants}`;

        const eventDescription = document.createElement("p");
        eventDescription.textContent = `Descrição: ${event.description}`;

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("container__section-button");
        buttonsContainer.style.marginBottom = "10px";

        const validateButton = document.createElement("button");
        validateButton.classList.add("container__button");
        validateButton.textContent = "Validar Evento";

        const removeButton = document.createElement("button");
        removeButton.classList.add("container__second-button");
        removeButton.textContent = "Remover Evento";

        buttonsContainer.appendChild(validateButton);
        buttonsContainer.appendChild(removeButton);

        eventElement.appendChild(eventName);
        eventElement.appendChild(hostName);
        eventElement.appendChild(eventDate);
        eventElement.appendChild(participants);
        eventElement.appendChild(eventDescription);

        eventSection.appendChild(eventElement);
        eventSection.appendChild(buttonsContainer);

        suggestionEventsContainer.appendChild(eventSection);

        if (index < suggestionEvents.length - 1) {
          const divider = document.createElement("hr");
          suggestionEventsContainer.appendChild(divider);
        }

        removeButton.addEventListener("click", () => {
          showRemoveConfirmation(eventSection, event._id);
        });

        validateButton.addEventListener("click", () => {
          showValidationPopup(event._id, event);
        });
      });
    } catch (error) {
      console.error("Erro ao carregar eventos sugeridos:", error);
    }
  };

  loadSuggestionEvents();

  function showRemoveConfirmation(eventSection, eventId) {
    overlay.style.display = "flex";
    const confirmRemoveButton = document.getElementById("confirmRemoveButton");
    const cancelRemoveButton = document.getElementById("cancelRemoveButton");

    confirmRemoveButton.onclick = async () => {
      eventSection.style.transition = "0.5s";
      eventSection.style.opacity = 0;
      eventSection.style.height = 0;

      await deleteSuggestionEvent(eventId);

      setTimeout(() => {
        eventSection.remove();
        overlay.style.display = "none";
      }, 500);
    };

    cancelRemoveButton.onclick = () => {
      overlay.style.display = "none";
    };
  }

  async function deleteSuggestionEvent(eventId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token de autorização não encontrado. Faça o login.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/suggestion-events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Erro ao remover o evento.");
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
    }
  }

  async function showValidationPopup(eventId, event) {
    const validateEventOverlay = document.getElementById(
      "validateEventOverlay"
    );
    const confirmValidateButton = document.getElementById(
      "confirmValidateButton"
    );
    const cancelValidateButton = document.getElementById(
      "cancelValidateButton"
    );

    validateEventOverlay.style.display = "flex";

    confirmValidateButton.onclick = async () => {
      const eventData = {
        nameEvent: event.nameEvent,
        host: event.host,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        participants: event.participants,
        description: event.description,
      };

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Evento validado e criado com sucesso!");

        await deleteSuggestionEvent(event._id);

        const eventSection = document.querySelector(
          `.container__section[data-eventid="${event._id}"]`
        );
        if (eventSection) {
          eventSection.remove();
        }

        window.location.reload();
      } else {
        alert("Erro ao criar o evento.");
      }

      validateEventOverlay.style.display = "none";
    };

    cancelValidateButton.onclick = () => {
      validateEventOverlay.style.display = "none";
    };
  }
});
