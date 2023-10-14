import { deleteEvent } from '../functions/eventsUtil.js';

export function openConfirmationModal(eventsData, eventId) {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.style.display = 'block';

    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    confirmDeleteButton.addEventListener('click', () => {
        closeConfirmationModal();
        deleteEvent(eventsData, eventId);
    });

    cancelDeleteButton.addEventListener('click', () => {
        closeConfirmationModal();
    });
}

export function closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.style.display = 'none';
}