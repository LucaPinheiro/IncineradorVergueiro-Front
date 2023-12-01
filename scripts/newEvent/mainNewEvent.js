document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/create-suggestion-event";
    const btnAgendarEvento = document.querySelector(".btn-event");
  
    const successModal = document.getElementById("success-modal");
    const closeModalButton = document.getElementById("close-modal");
  
    btnAgendarEvento.addEventListener("click", async (event) => {
      event.preventDefault();
  
      const nameEvent = document.querySelector('input[name="eventName"]').value;
      const host = document.querySelector('input[name="host"]').value;
      const date = document.querySelector('input[name="date"]').value;
      const startTime = document.querySelector('input[name="startTime"]').value;
      const endTime = document.querySelector('input[name="endTime"]').value;
      const participants = document.querySelector('input[name="participants"]').value;
      const description = document.querySelector("textarea").value;
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Token de autorização não encontrado. Faça o login.");
        return;
      }
  
      const eventData = {
        nameEvent,
        host,
        date,
        startTime,
        endTime,
        participants,
        description,
      };
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        successModal.style.display = "block";
  
        document.querySelector(".form-container").reset();
      } else {
        alert("Erro ao agendar o evento. Verifique os dados e tente novamente.");
      }
    });
  
    closeModalButton.addEventListener("click", () => {
      successModal.style.display = "none";
    });
  });
  