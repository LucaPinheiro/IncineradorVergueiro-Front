document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (token && userId) {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Erro ao obter informações do usuário.");
        }
      })
      .then((userData) => {
        const profileSection = document.getElementById("profile");
        profileSection.innerHTML = `
                <div class="third__container-border">
                  <p class="third__container-text">Nome: ${userData.name}</p>
                  <p class="third__container-text">Email: ${userData.email}</p>
                  <p class="third__container-text">CPF: ${userData.cpf}</p>
                  <p class="third__container-text">Telefone: ${userData.number}</p>
                </div>
              `;
      });
  } else {
    console.log(
      "Usuário não autenticado. Redirecionando para a página de login."
    );
    window.location.href = "../../pages/user/login.html";
  }
});
