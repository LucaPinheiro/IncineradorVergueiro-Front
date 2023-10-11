export function clearCart() {
    const cartTable = document.getElementById("cartTable");
    const cartTableBody = cartTable.querySelector("tbody");
    cartTableBody.innerHTML = "";
    updateTotal();
    localStorage.removeItem("cartData");
  }
  