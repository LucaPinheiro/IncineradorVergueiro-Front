document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("addProductForm");
  const openConfirmationModalButton = document.getElementById(
    "openConfirmationModal"
  );
  const confirmationModal = document.getElementById("confirmationModal");
  const successModal = document.getElementById("successModal");
  const closeSuccessButton = document.getElementById("closeSuccessButton");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");
  const productNameInput = document.getElementById("productName");
  const productValueInput = document.getElementById("productValue");
  const productImageInput = document.getElementById("productImage");

  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmationModal.style.display = "block";
  });

  confirmButton.addEventListener("click", async () => {
    confirmationModal.style.display = "none";
    const nameProduct = productNameInput.value;
    const price = parseFloat(productValueInput.value);
    const urlImageProduct = productImageInput.value;

    if (!nameProduct || isNaN(price) || !urlImageProduct) {
      console.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const productData = {
      nameProduct,
      urlImageProduct,
      price,
    };

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        successModal.style.display = "block";
        productNameInput.value = "";
        productValueInput.value = "";
        productImageInput.value = "";
      } else {
        console.error("Ocorreu um erro ao adicionar o produto.");
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
      console.error("Ocorreu um erro ao adicionar o produto.");
    }
  });

  closeSuccessButton.addEventListener("click", () => {
    successModal.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    confirmationModal.style.display = "none";
  });
});
