document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("addProductForm");

  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productNameInput = document.getElementById("productName");
    const productValueInput = document.getElementById("productValue");
    const productImageInput = document.getElementById("productImage");

    const nameProduct = productNameInput.value;
    const price = parseFloat(productValueInput.value);
    const urlImageProduct = productImageInput.value;

    if (!nameProduct || isNaN(price) || !urlImageProduct) {
      // Validação simples, verifique se os campos necessários foram preenchidos
      console.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const productData = {
      nameProduct,
      urlImageProduct,
      price,
    };

    console.log("Enviando dados do produto para o servidor:", productData);

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Produto adicionado com sucesso.");
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
});
