import { updateTotal } from "./cartTotal.js";
import { removeCartItem } from "./removeCartItem.js";
import { updateProductTotal } from "./updateProductTotal.js";

export function addToCart(productName, productPrice, id, trashImageSrc) {
  const cartTableBody = document.querySelector("#cartTable tbody");

  const newRow = cartTableBody.insertRow();
  const productNameCell = newRow.insertCell(0);
  const productQuantityCell = newRow.insertCell(1);
  const productPriceCell = newRow.insertCell(2);
  const deleteButtonCell = newRow.insertCell(3);

  const rows = cartTableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    rows[i].setAttribute("data-id", id);
  }

  productNameCell.textContent = productName;
  productQuantityCell.innerHTML = `
    <div class="quantity">
      <button class="quantity-btn minus">-</button>
      <span class="quantity-value">1</span>
      <button class="quantity-btn plus">+</button>
    </div>
  `;
  productPriceCell.textContent = productPrice;
  productPriceCell.classList.add("product-price");

  const trashImg = document.createElement("img");
  trashImg.src = "../../../assets/store/trash.svg";
  trashImg.alt = "Remover";
  trashImg.className = "trash-icon";
  deleteButtonCell.appendChild(trashImg);

  //button to remove a product from the table
  trashImg.addEventListener("click", () => {
    removeCartItem(newRow);
  });

  const plusButton = productQuantityCell.querySelector(".plus");
  const minusButton = productQuantityCell.querySelector(".minus");
  const quantityValue = productQuantityCell.querySelector(".quantity-value");

  plusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityValue.textContent);
    quantity++;
    quantityValue.textContent = quantity;

    updateProductTotal(newRow, productPrice);

    updateTotal();
  });

  minusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityValue.textContent);
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;

      updateProductTotal(newRow, productPrice);

      updateTotal();
    }
  });

  updateTotal();
}
