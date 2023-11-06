document.addEventListener("DOMContentLoaded", () => {
  const userTable = document.getElementById("userTable");

  fetch("http://localhost:3000/users/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const row = userTable.insertRow();

        const nameCell = row.insertCell(0);
        nameCell.innerHTML = `<p>${user.name}</p>`;

        const phoneCell = row.insertCell(1);
        phoneCell.textContent = user.number;

        const cpfCell = row.insertCell(2);
        cpfCell.textContent = user.cpf;
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar dados de usuários:", error);
    });
});
