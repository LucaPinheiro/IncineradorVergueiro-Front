document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const successModal = document.getElementById("success-modal");
  const closeModalButton = document.getElementById("close-modal");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const userId = data.userId;

        //token no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        successModal.style.display = "block";

        closeModalButton.addEventListener("click", () => {
          successModal.style.display = "none";

          if (email === "admin@email.com" && password === "admin123") {
            window.location.href = "../../pages/admin/adminPage.html";
          } else {
            window.location.href = "../../index.html";
          }
        });
      } else {
        alert("Credenciais inválidas. Verifique seu e-mail e senha.");
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
      alert("Erro durante a solicitação. Tente novamente mais tarde.");
    }
  });
});
