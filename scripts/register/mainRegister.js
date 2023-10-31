document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registrationForm");
  const createButton = document.getElementById("createButton");
  const successModal = document.getElementById("success-modal");
  const closeModalButton = document.getElementById("close-modal");

  function showSuccessModal() {
    successModal.style.display = "block";
  }

  createButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;

    const userData = {
      name: name,
      email: email,
      password: password,
      cpf: cpf,
      number: phone,
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        showSuccessModal(); 
      } else {
        // register error
        alert("Erro no registro. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
      alert("Erro durante a solicitação. Tente novamente mais tarde.");
    }
  });

  closeModalButton.addEventListener("click", () => {
    successModal.style.display = "none";
    window.location.href = "../../pages/user/login.html";
  });
});
