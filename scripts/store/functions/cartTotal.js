export function updateTotal() {
    const cartTableBody = document.querySelector("#cartTable tbody");
    const cartItems = Array.from(cartTableBody.querySelectorAll("tr"));
  
    let total = 0;
  
    cartItems.forEach((item) => {
      const productPriceCell = item.querySelector(".product-price");
      const quantityValue = item.querySelector(".quantity-value");
  
      const price = parseFloat(
        productPriceCell.textContent.replace("R$", "").replace(",", ".")
      );
      const quantity = parseInt(quantityValue.textContent);
  
      total += price;
    });
  
    const cartTotalElement = document.getElementById("cartTotal");
    cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
  }
  