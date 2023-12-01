document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector(".table");

  function createConfirmationModal(userId) {
    const modal = document.getElementById("deleteUserModal");
    modal.style.display = "block";

    const confirmButton = document.getElementById("confirmDelete");
    const cancelButton = document.getElementById("cancelDelete");

    confirmButton.addEventListener("click", () => {
      try {
        fetch(`http://localhost:3000/users/${userId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            const rowToDelete = document.querySelector(
              `[data-user-id="${userId}"]`
            );
            if (rowToDelete) {
              table.deleteRow(rowToDelete.rowIndex);
            }

            modal.style.display = "none";
            window.location.reload();
          })
          .catch((error) => {
            console.error("Erro ao excluir o usuário:", error);
            modal.style.display = "none";
          });
      } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
        modal.style.display = "none";
      }
    });

    cancelButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  fetch("http://localhost:3000/users/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const row = table.insertRow();
        row.setAttribute("data-user-id", user._id);

        const nameCell = row.insertCell(0);
        nameCell.innerHTML = `<p>${user.name}</p>`;

        const phoneCell = row.insertCell(1);
        phoneCell.textContent = user.number;

        const cpfCell = row.insertCell(2);
        cpfCell.textContent = user.cpf;

        const deleteCell = row.insertCell(3);
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "../../assets/store/trash.svg";
        deleteIcon.alt = "Lixeira";
        deleteCell.appendChild(deleteIcon);

        deleteIcon.addEventListener("click", () => {
          createConfirmationModal(user._id);
        });
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar dados de usuários:", error);
    });
});
