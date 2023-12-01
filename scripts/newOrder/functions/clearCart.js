export function clearCart() {
  const cartTable = document.getElementById("cartTable");
  const cartTableBody = cartTable.querySelector("tbody");
  cartTableBody.innerHTML = '';

  const cartTotalElement = document.getElementById("cartTotal");
  cartTotalElement.textContent = 'Total: R$ 0.00';

  const emptyCartData = {
    items: [],
    total: 0,
  };

  localStorage.setItem("cartData", JSON.stringify(emptyCartData));
}