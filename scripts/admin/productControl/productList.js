document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products");
  const createModal = document.getElementById("createModal");
  const successDeleteModal = document.getElementById("successDeleteModal");

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos.");
      }

      const products = await response.json();

      productsContainer.innerHTML = "";

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.setAttribute("data-id", product._id);

        const productName = document.createElement("span");
        productName.textContent = product.nameProduct;

        const productPrice = document.createElement("span");
        productPrice.textContent = `R$ ${product.price.toFixed(2)}`;

        const deleteButton = document.createElement("img");
        deleteButton.src = "../../assets/store/trash.svg";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () =>
          deleteProduct(product._id, productElement)
        );

        productElement.appendChild(productName);
        productElement.appendChild(productPrice);
        productElement.appendChild(deleteButton);

        productsContainer.appendChild(productElement);
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const deleteProduct = async (productId, productElement) => {
    createModal.style.display = "block";

    document
      .getElementById("createConfirmButton")
      .addEventListener("click", async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/products/${productId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            console.log("Produto excluído com sucesso!");
            successDeleteModal.style.display = "block";

            productElement.style.transition = "opacity 5s";
            productElement.style.opacity = 0;
            setTimeout(() => {
              productElement.remove();
            }, 500);
          } else {
            console.error("Erro ao excluir o produto.");
          }
        } catch (error) {
          console.error("Erro durante a solicitação:", error);
          console.error("Ocorreu um erro ao excluir o produto.");
        }

        createModal.style.display = "none";
      });

    document
      .getElementById("createCancelButton")
      .addEventListener("click", () => {
        createModal.style.display = "none";
      });

    document
      .getElementById("closeSuccessDeleteButton")
      .addEventListener("click", () => {
        successDeleteModal.style.display = "none";
      });
  };

  loadProducts();
});
