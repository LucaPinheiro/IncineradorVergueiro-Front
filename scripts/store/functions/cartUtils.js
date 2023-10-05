import { updateTotal } from "./cartTotal.js";

let itemsInCart = {};

export function addToCart(productName, productPrice, id, trashImageSrc) {
  const cartTableBody = document.querySelector("#cartTable tbody");

  const newRow = cartTableBody.insertRow();
  const productNameCell = newRow.insertCell(0);
  const productQuantityCell = newRow.insertCell(1);
  const productPriceCell = newRow.insertCell(2);
  const deleteButtonCell = newRow.insertCell(3);

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

  if (itemsInCart[id]) {
    itemsInCart[id] += 1;
  } else {
    itemsInCart[id] = 1;
  }

  updateTotal();
}

function updateProductTotal(row, productPrice) {
  const productPriceCell = row.querySelector(".product-price");
  const quantityValue = row.querySelector(".quantity-value");

  const quantity = parseInt(quantityValue.textContent);
  const total = productPrice * quantity;

  productPriceCell.textContent = `R$ ${total.toFixed(2)}`;
}
