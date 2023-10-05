import { removeItemFromCart } from "./addProductToSection.js";
import { updateTotal } from "./cartTotal.js";

export function removeCartItem(row) {
  row.classList.add("fade-out");

  removeItemFromCart(row.dataset.id);

  setTimeout(() => {
    row.remove();
    updateTotal();
  }, 500);
}
