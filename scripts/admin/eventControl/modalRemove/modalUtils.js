import { removeEventWithAnimation } from '../modalRemove/deleteEvent.js';

export function openConfirmationModal(eventId) {
  const confirmationModal = document.getElementById("confirmationModal");
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const cancelDeleteButton = document.getElementById("cancelDeleteButton");
  
  const eventCard = document.getElementById(`event-${eventId}`);
  
  confirmDeleteButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          removeEventWithAnimation(eventCard);
        } else {
          console.error("Falha ao excluir o evento");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  
    closeConfirmationModal();
  });
  
  cancelDeleteButton.addEventListener("click", () => {
    closeConfirmationModal();
  });
  
  confirmationModal.style.display = "block";
}
  
export function closeConfirmationModal() {
  const confirmationModal = document.getElementById("confirmationModal");
  confirmationModal.style.display = "none";
}
