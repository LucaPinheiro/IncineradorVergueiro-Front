document.addEventListener("DOMContentLoaded", () => {
  const cartDataJSON = localStorage.getItem("cartData");

  if (cartDataJSON) {
    const cartData = JSON.parse(cartDataJSON);

    const cartTable = document.getElementById("cartTable");
    const cartTableBody = cartTable.querySelector("tbody");
    cartTableBody.innerHTML = ""; 

    cartData.items.forEach((item) => {
      const newRow = cartTableBody.insertRow();
      const productNameCell = newRow.insertCell(0);
      const productQuantityCell = newRow.insertCell(1);
      const productPriceCell = newRow.insertCell(2);
      const deleteButtonCell = newRow.insertCell(3);

      productNameCell.textContent = item.name;
      productQuantityCell.textContent = item.quantity;
      productPriceCell.textContent = `R$ ${item.price.toFixed(2)}`;
      productPriceCell.classList.add("product-price");

      const trashImg = document.createElement("img");
      trashImg.src = "../../assets/store/trash.svg";
      trashImg.alt = "Remover";
      trashImg.className = "trash-icon";
      deleteButtonCell.appendChild(trashImg);

      trashImg.addEventListener("click", () => {
        newRow.style.animation = "fadeOut 0.3s";

        setTimeout(() => {
          cartTableBody.removeChild(newRow);

          newRow.style.animation = "none";

          const index = cartData.items.findIndex((i) => i.name === item.name);
          if (index !== -1) {
            cartData.items.splice(index, 1);

            cartData.total -= item.price;

            const cartTotalElement = document.getElementById("cartTotal");
            cartTotalElement.textContent = `Total: R$ ${cartData.total.toFixed(
              2
            )}`;
          }

          localStorage.setItem("cartData", JSON.stringify(cartData));
        }, 300);
      });
    });

    updateTotal();
  }
});

function updateTotal() {
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

function clearCart() {
  const cartTable = document.getElementById("cartTable");
  const cartTableBody = cartTable.querySelector("tbody");
  cartTableBody.innerHTML = "";
  updateTotal();
  localStorage.removeItem("cartData");
}
