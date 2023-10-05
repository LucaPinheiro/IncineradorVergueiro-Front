export function addToCart(productName, productPrice) {
  const cartTableBody = document.querySelector("#cartTable tbody");

  const newRow = cartTableBody.insertRow();
  const productNameCell = newRow.insertCell(0);
  const productQuantityCell = newRow.insertCell(1);
  const productPriceCell = newRow.insertCell(2);

  productNameCell.textContent = productName;
  productQuantityCell.innerHTML = `
    <div class="quantity">
      <button class="quantity-btn minus">-</button>
      <span class="quantity-value">1</span>
      <button class="quantity-btn plus">+</button>
    </div>
  `;
  productPriceCell.textContent = productPrice;

  const plusButton = productQuantityCell.querySelector(".plus");
  const minusButton = productQuantityCell.querySelector(".minus");
  const quantityValue = productQuantityCell.querySelector(".quantity-value");

  plusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityValue.textContent);
    quantity++;
    quantityValue.textContent = quantity;
  });

  minusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityValue.textContent);
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  });
}