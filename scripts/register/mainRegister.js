document.addEventListener("DOMContentLoaded", () => {
  const closeModalButton = document.getElementById("error-modal-close");
  const errorModal = document.getElementById("error-modal");
  const closeModalSucess = document.getElementById("close-modal");
  const sucessModal = document.getElementById("success-modal");

  closeModalButton.addEventListener("click", () => {
    errorModal.style.display = "none";
  });

  closeModalSucess.addEventListener("click", () => {
    successModal.style.display = "none";
    window.location.reload();
  });

  const registrationForm = document.getElementById("registrationForm");
  const createButton = document.getElementById("createButton");
  const successModal = document.getElementById("success-modal");

  function showErrorModal(errorMessage) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = errorMessage;
    errorModal.style.display = "block";
  }

  function showSuccessModal() {
    successModal.style.display = "block";
  }

  createButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;

    if (/\d/.test(name)) {
      showErrorModal("O nome não pode conter números.");
      return;
    }

    if (name.trim() === "") {
      showErrorModal("O campo nome não pode estar vazio.");
      return;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      showErrorModal("O CPF deve estar no formato correto (XXX.XXX.XXX-XX).");
      return;
    }

    if (password.trim() === "") {
      showErrorModal("A senha não pode estar vazia.");
      return;
    }

    if (confirmPassword.trim() === "") {
      showErrorModal("Por favor, confirme a senha.");
      return;
    }

    if (password !== confirmPassword) {
      showErrorModal("A senha e a confirmação de senha não coincidem.");
      return;
    }

    if (phone.trim() === "") {
      showErrorModal("O campo de telefone não pode estar vazio.");
      return;
    }

    if (!/^(\(\d{2}\)9)/.test(phone)) {
      showErrorModal("O número do telefone deve começar com 9: (xx)9xxxx-xxxx");
      return;
    }

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
        const errorMessage = await response.text();
        showErrorModal(`Erro no registro: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
      alert("Erro durante a solicitação. Tente novamente mais tarde.");
    }
  });
});
