export function clearCart() {
  const cartTableBody = document.querySelector("#cartTable tbody");
  const cartItems = Array.from(cartTableBody.querySelectorAll("tr"));

  cartItems.forEach((item) => {
    item.classList.add("fade-out");
  });

  setTimeout(() => {
    cartItems.forEach((item) => {
      item.remove();
    });
  }, 500);
}
