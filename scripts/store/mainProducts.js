import { generateProductHTML } from "./functions/productUtil.js";
import { addProductToSection } from "./functions/addProductToSection.js";
import { clearCart } from "./functions/clearCart.js";
import { updateTotal } from "./functions/cartTotal.js";
import { removeCartItem } from "./functions/removeCartItem.js";

async function getProductsFromAPI() {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Erro ao obter produtos da API");
    }
    const products = await response.json();
    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const apiProducts = await getProductsFromAPI();

  for (const product of apiProducts) {
    addProductToSection(
      product.nameProduct,
      product.urlImageProduct,
      product.price,
      product._id,
      "productSection"
    );
  }

  const clearCartIcon = document.getElementById("clearCartIcon");
  clearCartIcon.addEventListener("click", () => {
    clearCart();
    updateTotal();
  });

  const newOrderBtn = document.getElementById("newOrderBtn");

  newOrderBtn.addEventListener("click", (event) => {});
});

// localStorage start
newOrderBtn.addEventListener("click", (event) => {
  const cartTable = document.getElementById("cartTable");
  const cartItems = cartTable.querySelectorAll("tbody tr");

  if (cartItems.length === 0) {
    alert(
      "Seu carrinho está vazio. Adicione produtos antes de agendar um pedido."
    );
    event.preventDefault();
  } else {
    const newCartItems = [];

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

      newCartItems.push({
        name: name,
        quantity: quantity,
        price: price,
      });

      total += price;
    });

    const cartTotalElement = document.getElementById("cartTotal");
    cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

    const cartDataNovo = {
      items: newCartItems,
      total: total,
    };

    localStorage.setItem("cartData", JSON.stringify(cartDataNovo));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartDataJSON = localStorage.getItem("cartData");

  if (cartDataJSON) {
    const cartData = JSON.parse(cartDataJSON);

    clearCart();

    const cartTable = document.getElementById("cartTable");
    const cartTableBody = cartTable.querySelector("tbody");

    cartData.items.forEach((item) => {
      const newRow = cartTableBody.insertRow();
      const productNameCell = newRow.insertCell(0);
      const productQuantityCell = newRow.insertCell(1);
      const productPriceCell = newRow.insertCell(2);
      const deleteButtonCell = newRow.insertCell(3);

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

      trashImg.addEventListener("click", () => {
        removeCartItem(newRow);
        const index = cartData.items.findIndex((i) => i.name === item.name);
        if (index !== -1) {
          cartData.items.splice(index, 1);
        }
        updateTotal();
        localStorage.setItem("cartData", JSON.stringify(cartData));
      });

      const plusButton = productQuantityCell.querySelector(".plus");
      plusButton.addEventListener("click", () => {
        let quantity = parseInt(
          productQuantityCell.querySelector(".quantity-value").textContent
        );
        quantity++;
        productQuantityCell.querySelector(".quantity-value").textContent =
          quantity;
        item.quantity = quantity;
        productPriceCell.textContent = `R$ ${(item.price * quantity).toFixed(
          2
        )}`;
        updateTotal();
        localStorage.setItem("cartData", JSON.stringify(cartData));
      });

      const minusButton = productQuantityCell.querySelector(".minus");
      minusButton.addEventListener("click", () => {
        let quantity = parseInt(
          productQuantityCell.querySelector(".quantity-value").textContent
        );
        if (quantity > 1) {
          quantity--;
          productQuantityCell.querySelector(".quantity-value").textContent =
            quantity;
          item.quantity = quantity;
          productPriceCell.textContent = `R$ ${(item.price * quantity).toFixed(
            2
          )}`;
          updateTotal();
          localStorage.setItem("cartData", JSON.stringify(cartData));
        }
      });
    });
  }
});
