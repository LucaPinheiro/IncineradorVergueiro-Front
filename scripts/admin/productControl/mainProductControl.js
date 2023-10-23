document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("addProductForm");
  const openConfirmationModalButton = document.getElementById("openConfirmationModal");
  const confirmationModal = document.getElementById("confirmationModal");
  const successModal = document.getElementById("successModal");
  const errorModal = document.getElementById("errorModal");
  const emptyFieldsModal = document.getElementById("emptyFieldsModal");
  const closeSuccessButton = document.getElementById("closeSuccessButton");
  const closeErrorButton = document.getElementById("closeErrorButton");
  const closeEmptyFieldsButton = document.getElementById("closeEmptyFieldsButton");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");
  const productNameInput = document.getElementById("productName");
  const productValueInput = document.getElementById("productValue");
  const productImageInput = document.getElementById("productImage");

  addProductForm.addEventListener("submit", (e) => {
      e.preventDefault(); 

      const nameProduct = productNameInput.value;
      const price = parseFloat(productValueInput.value);
      const urlImageProduct = productImageInput.value;

      if (!nameProduct || isNaN(price) || !urlImageProduct) {
          emptyFieldsModal.style.display = "block"; 
      } else {
          confirmationModal.style.display = "block"; 
      }
  });

  confirmButton.addEventListener("click", async () => {
      confirmationModal.style.display = "none";
      const nameProduct = productNameInput.value;
      const price = parseFloat(productValueInput.value);
      const urlImageProduct = productImageInput.value;

      if (!nameProduct || isNaN(price) || !urlImageProduct) {
          emptyFieldsModal.style.display = "block"; 
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
              errorModal.style.display = "block"; 
          }
      } catch (error) {
          console.error("Erro durante a solicitação:", error);
          errorModal.style.display = "block"; 
      }
  });

  closeSuccessButton.addEventListener("click", () => {
      successModal.style.display = "none"; 
  });

  closeErrorButton.addEventListener("click", () => {
      errorModal.style.display = "none";
  });

  closeEmptyFieldsButton.addEventListener("click", () => {
      emptyFieldsModal.style.display = "none"; 
  });

  cancelButton.addEventListener("click", () => {
      confirmationModal.style.display = "none";
  });
});
