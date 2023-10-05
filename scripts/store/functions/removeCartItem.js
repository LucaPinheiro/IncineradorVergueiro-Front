import { updateTotal } from "./cartTotal.js";

export function removeCartItem(row) {
    row.classList.add("fade-out");
  
    setTimeout(() => {
      row.remove();
      updateTotal();
    }, 500);
  }
  