import { generateProductHTML } from "./functions/productUtil.js";
import { addProductToSection } from "./functions/addProductToSection.js";
import { products } from "./productsData.js/products.js";
import { clearCart } from "./functions/clearCart.js";
import { updateTotal } from "./functions/cartTotal.js";
import { removeCartItem } from "./functions/removeCartItem.js";

for (const product of products) {
  addProductToSection(
    product.name,
    product.imageSrc,
    product.price,
    product.id,
    "productSection"
  );
}

const clearCartIcon = document.getElementById("clearCartIcon");
clearCartIcon.addEventListener("click", () => {
  clearCart();
  updateTotal();
});

const newOrderBtn = document.getElementById("newOrderBtn");

newOrderBtn.addEventListener("click", (event) => {

  localStorage.removeItem("cartData");
  
  const cartTable = document.getElementById("cartTable");
  const cartItems = cartTable.querySelectorAll("tbody tr");

  if (cartItems.length === 0) {
    alert(
      "Seu carrinho está vazio. Adicione produtos antes de agendar um pedido."
    );
    event.preventDefault();
  }
});

// localStorage


newOrderBtn.addEventListener("click", (event) => {
    const cartTable = document.getElementById("cartTable");
    const cartItems = cartTable.querySelectorAll("tbody tr");

    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos antes de agendar um pedido.");
        event.preventDefault();
    } else {
        // Criar um array para armazenar os novos itens do carrinho
        const newCartItems = [];

        // Calcular o total antes de salvar os dados
        let total = 0;
        cartItems.forEach((item) => {
            const productNameCell = item.querySelector("td:first-child");
            const productQuantityCell = item.querySelector(".quantity-value");
            const productPriceCell = item.querySelector(".product-price");

            const name = productNameCell.textContent;
            const quantity = parseInt(productQuantityCell.textContent);
            const price = parseFloat(
                productPriceCell.textContent.replace("R$", "").replace(",", ".")
            );

            // Adicionar o item ao novo array de itens do carrinho
            newCartItems.push({
                name: name,
                quantity: quantity,
                price: price
            });

            total += price * quantity;
        });

        // Atualizar o elemento #cartTotal .container__cart__total__text com o total calculado
        const cartTotalElement = document.getElementById("cartTotal");
        cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

        // Criar um objeto com os novos itens do carrinho e o total
        const cartDataNovo = {
            items: newCartItems,
            total: total
        };

        // Converter os dados em JSON e salvar no Local Storage
        localStorage.setItem("cartData", JSON.stringify(cartDataNovo));
    }
});


// Verifique se há dados no Local Storage ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const cartDataJSON = localStorage.getItem("cartData");

  // Se houver dados no Local Storage
  if (cartDataJSON) {
    // Converta a string JSON de volta em uma estrutura de dados
    const cartData = JSON.parse(cartDataJSON);

    // Limpe o carrinho atual antes de adicionar os itens do Local Storage
    clearCart();

    // Atualize a tabela do carrinho com os itens do Local Storage
    const cartTable = document.getElementById("cartTable");
    const cartTableBody = cartTable.querySelector("tbody");

    cartData.items.forEach((item) => {
      // Crie uma nova linha para o item
      const newRow = cartTableBody.insertRow();
      const productNameCell = newRow.insertCell(0);
      const productQuantityCell = newRow.insertCell(1);
      const productPriceCell = newRow.insertCell(2);
      const deleteButtonCell = newRow.insertCell(3);

      // Preencha as células com os dados do item
      productNameCell.textContent = item.name;
      productQuantityCell.innerHTML = `
              <div class="quantity">
                  <button class="quantity-btn minus">-</button>
                  <span class="quantity-value">${item.quantity}</span>
                  <button class="quantity-btn plus">+</button>
              </div>
          `;
      productPriceCell.textContent = `R$ ${item.price.toFixed(2)}`;
      productPriceCell.classList.add("product-price");

      const trashImg = document.createElement("img");
      trashImg.src = "../../../assets/store/trash.svg";
      trashImg.alt = "Remover";
      trashImg.className = "trash-icon";
      deleteButtonCell.appendChild(trashImg);

      // Botão de exclusão (trashImg)
      trashImg.addEventListener("click", () => {
        removeCartItem(newRow);
        // Remova o item da lista de itens do carrinho (se necessário)
        const index = cartData.items.findIndex((i) => i.name === item.name);
        if (index !== -1) {
          cartData.items.splice(index, 1);
        }
        // Atualize o total do carrinho
        updateTotal();
        // Atualize os dados no Local Storage após a exclusão (opcional)
        localStorage.setItem("cartData", JSON.stringify(cartData));
      });

      // Botão de aumento
      const plusButton = productQuantityCell.querySelector(".plus");
      plusButton.addEventListener("click", () => {
        // Lógica de aumento da quantidade e atualização do preço total
        let quantity = parseInt(
          productQuantityCell.querySelector(".quantity-value").textContent
        );
        quantity++;
        productQuantityCell.querySelector(".quantity-value").textContent =
          quantity;
        // Atualize o preço total do item
        item.quantity = quantity;
        productPriceCell.textContent = `R$ ${(item.price * quantity).toFixed(
          2
        )}`;
        // Atualize o total do carrinho
        updateTotal();
        // Atualize os dados no Local Storage após a alteração (opcional)
        localStorage.setItem("cartData", JSON.stringify(cartData));
      });

      // Botão de diminuição
      const minusButton = productQuantityCell.querySelector(".minus");
      minusButton.addEventListener("click", () => {
        // Lógica de diminuição da quantidade e atualização do preço total
        let quantity = parseInt(
          productQuantityCell.querySelector(".quantity-value").textContent
        );
        if (quantity > 1) {
          quantity--;
          productQuantityCell.querySelector(".quantity-value").textContent =
            quantity;
          // Atualize o preço total do item
          item.quantity = quantity;
          productPriceCell.textContent = `R$ ${(item.price * quantity).toFixed(
            2
          )}`;
          // Atualize o total do carrinho
          updateTotal();
          // Atualize os dados no Local Storage após a alteração (opcional)
          localStorage.setItem("cartData", JSON.stringify(cartData));
        }
      });
    });
  }
});
