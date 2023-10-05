export function updateProductTotal(row, productPrice) {
    const productPriceCell = row.querySelector(".product-price");
    const quantityValue = row.querySelector(".quantity-value");
  
    const quantity = parseInt(quantityValue.textContent);
    const total = productPrice * quantity;
  
    productPriceCell.textContent = `R$ ${total.toFixed(2)}`;
  }
  