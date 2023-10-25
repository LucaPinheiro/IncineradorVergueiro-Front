document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

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

        // Armazene o token no localStorage
        localStorage.setItem("token", token);

        window.location.href = "../../index.html";
      } else {
        alert("Credenciais inválidas. Verifique seu e-mail e senha.");
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
      alert("Erro durante a solicitação. Tente novamente mais tarde.");
    }
  });
});
