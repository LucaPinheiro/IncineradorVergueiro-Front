document.addEventListener("DOMContentLoaded", () => {
  const createEventButton = document.getElementById("createEventButton");
  const confirmationModal = document.getElementById("confirmationModal");
  const successModal = document.getElementById("successModal");
  const errorModal = document.getElementById("errorModal");
  const emptyFieldsModal = document.getElementById("emptyFieldsModal");
  const closeSuccessButton = document.getElementById("closeSuccessButton");
  const closeErrorButton = document.getElementById("closeErrorButton");
  const closeEmptyFieldsButton = document.getElementById(
    "closeEmptyFieldsButton"
  );
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");

  createEventButton.addEventListener("click", () => {
    const eventName = document.getElementById("eventName").value;
    const hostName = document.getElementById("hostName").value;
    const eventDate = document.getElementById("eventDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const participants = parseInt(
      document.getElementById("participants").value
    );
    const eventDescription = document.getElementById("eventDescription").value;

    if (
      eventName === "" ||
      hostName === "" ||
      eventDate === "" ||
      startTime === "" ||
      endTime === "" ||
      isNaN(participants) ||
      participants <= 0 ||
      eventDescription === ""
    ) {
      emptyFieldsModal.style.display = "block";
    } else {
      confirmationModal.style.display = "block";
    }
  });

  closeSuccessButton.addEventListener("click", () => {
    successModal.style.display = "none";
  });

  closeErrorButton.addEventListener("click", () => {
    errorModal.style.display = "none";
  });

  closeEmptyFieldsButton.addEventListener("click", () => {
    emptyFieldsModal.style.display = "none";
  });

  confirmButton.addEventListener("click", () => {
    emptyFieldsModal.style.display = "none";
    confirmationModal.style.display = "none";
    const eventName = document.getElementById("eventName").value;
    const hostName = document.getElementById("hostName").value;
    const eventDate = document.getElementById("eventDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const participants = parseInt(
      document.getElementById("participants").value
    );
    const eventDescription = document.getElementById("eventDescription").value;

    const eventData = {
      nameEvent: eventName,
      host: hostName,
      date: eventDate,
      startTime: startTime,
      endTime: endTime,
      participants: participants,
      description: eventDescription,
    };

    handleEventCreation(eventData);
  });

  cancelButton.addEventListener("click", () => {
    emptyFieldsModal.style.display = "none";
    confirmationModal.style.display = "none";
  });

  const handleEventCreation = async (eventData) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        successModal.style.display = "block";
        document.getElementById("eventName").value = "";
        document.getElementById("hostName").value = "";
        document.getElementById("eventDate").value = "";
        document.getElementById("startTime").value = "";
        document.getElementById("endTime").value = "";
        document.getElementById("participants").value = "";
        document.getElementById("eventDescription").value = "";
      } else {
        errorModal.style.display = "block";
      }
    } catch (error) {
      console.error(error);
      errorModal.style.display = "block";
    }
  };
});
