export function deleteEvent(eventsData, eventId) {
  const eventIndex = eventsData.findIndex((event) => event.id === eventId);

  if (eventIndex !== -1) {
    const eventCard = document.getElementById(`event-${eventId}`);
    if (eventCard) {
      eventCard.classList.add("fade-out");
      setTimeout(() => {
        eventsData.splice(eventIndex, 1);
        eventCard.remove();
      }, 400);
    }
  }
}

export function openConfirmationModal(eventId) {
  const confirmationModal = document.getElementById("confirmationModal");
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const cancelDeleteButton = document.getElementById("cancelDeleteButton");

  confirmDeleteButton.addEventListener("click", () => {
    deleteEvent(eventId); // Exclui o evento se o usuário confirmar
    confirmationModal.style.display = "none";
  });

  cancelDeleteButton.addEventListener("click", () => {
    confirmationModal.style.display = "none"; // Fecha o modal sem excluir
  });

  confirmationModal.style.display = "block";
}
