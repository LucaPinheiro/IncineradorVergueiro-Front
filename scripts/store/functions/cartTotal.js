export function updateTotal() {
  const cartTableBody = document.querySelector("#cartTable tbody");
  const cartItems = Array.from(cartTableBody.querySelectorAll("tr"));

  let total = 0;

  cartItems.forEach((item) => {
    const productPriceCell = item.querySelector("td:nth-child(3)");
    const quantityValue = item.querySelector(".quantity-value");

    const price = parseFloat(
      productPriceCell.textContent.replace("R$", "").replace(",", ".")
    );
    const quantity = parseInt(quantityValue.textContent);

    total += price * quantity;
  });

  const cartTotalElement = document.getElementById("cartTotal");
  cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}
