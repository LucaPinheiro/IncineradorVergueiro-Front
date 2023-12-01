export function updateTotal() {
    const cartDataJSON = localStorage.getItem("cartData");
    if (cartDataJSON) {
      const cartData = JSON.parse(cartDataJSON);
      let total = 0;
      cartData.items.forEach((item) => {
        total += item.price;
      });
      const cartTotalElement = document.getElementById("cartTotal");
      cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
  }