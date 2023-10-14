import eventsData from '../eventControl/data/eventsControlData.js';

const eventCardsContainer = document.getElementById('eventCards');

function deleteEvent(eventId) {
    const eventIndex = eventsData.findIndex(event => event.id === eventId);

    if (eventIndex !== -1) {
        const eventCard = document.getElementById(`event-${eventId}`);
        if (eventCard) {
            eventCard.classList.add('fade-out'); // Adicione a classe 'fade-out'
            setTimeout(() => {
                eventsData.splice(eventIndex, 1);
                eventCard.remove();
            }, 300); // Remova o elemento após 300ms (0.3 segundos)
        }
    }
}

eventsData.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `event-${event.id}`;

    const cardBox = document.createElement('div');
    cardBox.className = 'card_box';

    const namePara = document.createElement('p');
    namePara.className = 'text';
    namePara.textContent = `Nome do Evento: ${event.nome}`;
    cardBox.appendChild(namePara);

    const descPara = document.createElement('p');
    descPara.className = 'text';
    descPara.textContent = `Descrição: ${event.descricao}`;
    cardBox.appendChild(descPara);

    const idPara = document.createElement('p');
    idPara.className = 'text';
    idPara.textContent = `ID Evento: ${event.id}`;
    cardBox.appendChild(idPara);

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'button';
    deleteButton.textContent = 'Apagar';
    deleteButton.addEventListener('click', () => {
        deleteEvent(event.id);
    });
    buttons.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.className = 'button';
    editButton.textContent = 'Editar';
    buttons.appendChild(editButton);

    card.appendChild(cardBox);
    card.appendChild(buttons);

    eventCardsContainer.appendChild(card);
});
