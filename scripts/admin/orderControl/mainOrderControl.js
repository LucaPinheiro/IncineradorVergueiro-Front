document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();

    const ordersContainer = document.getElementById("ordersContainer");

    for (const order of orders) {
      const userResponse = await fetch(
        `http://localhost:3000/users/${order.userId}`
      );
      const userData = await userResponse.json();

      const orderSection = document.createElement("section");
      orderSection.classList.add("border-section");

      const userContainer = document.createElement("div");
      userContainer.classList.add("third__container");

      const userImage = document.createElement("img");
      userImage.src =
        "../../assets/adm/order/icons8-usuário-homem-com-círculo-64.png";
      userImage.alt = "User image";
      userImage.classList.add("container__image");

      const userInfoContainer = document.createElement("div");
      userInfoContainer.classList.add("fourth__container");

      const userName = document.createElement("p");
      userName.classList.add("container__text");
      userName.textContent = `Nome do Usuário: ${userData.name}`;
      userInfoContainer.appendChild(userName);

      const userNumber = document.createElement("p");
      userNumber.classList.add("container__text");
      userNumber.textContent = `Número: ${userData.number || "N/A"}`;
      userInfoContainer.appendChild(userNumber);

      const userEmail = document.createElement("p");
      userEmail.classList.add("container__text");
      userEmail.textContent = `Email: ${userData.email || "N/A"}`;
      userInfoContainer.appendChild(userEmail);

      userContainer.appendChild(userImage);
      userContainer.appendChild(document.createElement("hr"));
      userContainer.appendChild(userInfoContainer);

      orderSection.appendChild(userContainer);

      const orderTable = document.createElement("table");
      orderTable.classList.add("second-border-section-table");

      const tableColumns = document.createElement("tr");
      tableColumns.classList.add("container__columns");

      const columns = ["Produtos", "Quantidade", "Preço", "Total/Item"];
      columns.forEach((columnText) => {
        const column = document.createElement("td");
        column.textContent = columnText;
        tableColumns.appendChild(column);
      });

      orderTable.appendChild(tableColumns);

      order.orderItems.forEach((item) => {
        const tableRow = document.createElement("tr");
        tableRow.classList.add("container__columns");

        const productNameCell = document.createElement("td");
        productNameCell.textContent = item.productName;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;

        const priceCell = document.createElement("td");
        priceCell.textContent = `R$ ${item.price.toFixed(2)}`;

        const totalCell = document.createElement("td");
        totalCell.textContent = `R$ ${(item.price * item.quantity).toFixed(2)}`;

        tableRow.appendChild(productNameCell);
        tableRow.appendChild(quantityCell);
        tableRow.appendChild(priceCell);
        tableRow.appendChild(totalCell);

        orderTable.appendChild(tableRow);
      });

      const totalRow = document.createElement("tr");
      totalRow.classList.add("container__columns", "text-total");

      const totalLabel = document.createElement("td");
      totalLabel.textContent = "Total";

      const totalCell = document.createElement("td");
      totalCell.textContent = `R$ ${order.totalPrice.toFixed(2)}`;

      totalRow.appendChild(totalLabel);
      totalRow.appendChild(document.createElement("td"));
      totalRow.appendChild(document.createElement("td"));
      totalRow.appendChild(totalCell);

      orderTable.appendChild(totalRow);

      const dateTimeRow = document.createElement("tr");
      dateTimeRow.classList.add("container__second-columns");

      const dateCell = document.createElement("td");
      dateCell.textContent = `Data: ${order.orderItems[0].date}`;

      dateTimeRow.appendChild(dateCell);

      const timeCell = document.createElement("td");
      timeCell.textContent = `Horário: ${order.orderItems[0].time || "N/A"}`;

      dateTimeRow.appendChild(timeCell);

      orderTable.appendChild(dateTimeRow);

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("container__buttons");

      const approveButton = document.createElement("button");
      approveButton.classList.add("container__buttons-button");
      approveButton.textContent = "Aprovar Pedido";
      buttonsContainer.appendChild(approveButton);

      const rejectButton = document.createElement("button");
      rejectButton.classList.add("container__buttons-button-red");
      rejectButton.textContent = "Rejeitar Pedido";
      buttonsContainer.appendChild(rejectButton);

      orderSection.appendChild(orderTable);
      orderSection.appendChild(buttonsContainer);

      ordersContainer.appendChild(orderSection);

      approveButton.onclick = (event) => {
        event.stopPropagation();
        openConfirmationModal(order._id, "Aprovar");
      };

      rejectButton.onclick = (event) => {
        event.stopPropagation();
        openConfirmationModal(order._id, "Rejeitar");
      };
    }
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error.message);
  }
});

function openConfirmationModal(orderId, action) {
  const modal = document.getElementById("confirmationModal");
  const modalText = document.getElementById("modalText");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");

  modalText.textContent = `Tem certeza que deseja ${action.toLowerCase()} este pedido?`;

  modal.style.display = "block";

  confirmButton.onclick = async () => {
    try {
      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "DELETE",
      });

      alert(`Pedido ${action.toLowerCase()} com sucesso!`);
      location.reload();
    } catch (error) {
      console.error(`Erro ao ${action.toLowerCase()} pedido:`, error.message);
      alert(`Erro ao ${action.toLowerCase()} pedido. Tente novamente.`);
    } finally {
      closeModal();
    }
  };

  cancelButton.onclick = () => {
    closeModal();
  };
}

function closeModal() {
  const modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("confirmationModal");
  if (event.target == modal) {
    closeModal();
  }
};
