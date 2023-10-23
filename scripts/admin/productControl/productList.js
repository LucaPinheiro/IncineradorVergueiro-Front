document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
  
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
          deleteButton.addEventListener("click", () => deleteProduct(product._id));
  
          productElement.appendChild(productName);
          productElement.appendChild(productPrice);
          productElement.appendChild(deleteButton);
  
          productsContainer.appendChild(productElement);
        });
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
  
    const deleteProduct = async (productId) => {
      if (confirm("Tem certeza de que deseja excluir este produto?")) {
        try {
          const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: "DELETE",
          });
  
          if (response.ok) {
            console.log("Produto excluído com sucesso!");
            const productToDelete = productsContainer.querySelector(`[data-id="${productId}"]`);
            if (productToDelete) {
              productToDelete.style.transition = "opacity 0.5s";
              productToDelete.style.opacity = 0;
              setTimeout(() => {
                productToDelete.remove();
              }, 500);
            }
          } else {
            console.error("Erro ao excluir o produto.");
          }
        } catch (error) {
          console.error("Erro durante a solicitação:", error);
          console.error("Ocorreu um erro ao excluir o produto.");
        }
      }
    };
  
    loadProducts();
  });
  