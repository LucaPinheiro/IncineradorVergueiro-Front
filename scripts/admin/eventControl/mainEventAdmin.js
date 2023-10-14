import eventsData from '../eventControl/data/eventsControlData.js';

const eventCardsContainer = document.getElementById('eventCards');

eventsData.forEach(event => {
  const card = document.createElement('div');
  card.className = 'card';

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
  buttons.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.className = 'button';
  editButton.textContent = 'Editar';
  buttons.appendChild(editButton);

  card.appendChild(cardBox);
  card.appendChild(buttons);

  eventCardsContainer.appendChild(card);
});
